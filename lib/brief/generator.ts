/**
 * lib/brief/generator.ts
 * ──────────────────────────────────────────────────────────────────────────────
 * Genera el "Brief del día" con Claude analizando ~60 artículos RSS.
 *
 * Arquitectura (cache en /tmp):
 *  - Lee /tmp/cafe-brief.json si tiene <3h → respuesta instantánea
 *  - Si el cache es viejo o no existe → llama a Claude + guarda en /tmp
 *  - El cron de Vercel pre-genera cada mañana a las 8am Chile
 *  - En la primera request del día puede tardar 30-60s (por eso el cron existe)
 */

import fs from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";
import { fetchNewsByCategory } from "@/lib/feeds";
import type { Brief, BriefItem, BriefTema, Category } from "@/types";

// ─── Config ──────────────────────────────────────────────────────────────────

const CACHE_TTL_MS   = 3 * 60 * 60 * 1000; // 3 horas
const CACHE_FILE     = path.join("/tmp", "cafe-brief.json");
const MAX_ARTICLES   = 60;

// ─── Helpers de fecha ────────────────────────────────────────────────────────

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function todayLabel() {
  return new Date().toLocaleDateString("es-CL", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ─── Cache en /tmp ───────────────────────────────────────────────────────────

interface CacheEntry {
  brief: Brief;
  cachedAt: number; // Date.now()
}

function readCache(): Brief | null {
  try {
    if (!fs.existsSync(CACHE_FILE)) return null;
    const raw = fs.readFileSync(CACHE_FILE, "utf-8");
    const entry: CacheEntry = JSON.parse(raw);
    const age = Date.now() - entry.cachedAt;
    if (age > CACHE_TTL_MS) return null; // cache expirado
    // Invalidar si el brief es de un día diferente al de hoy
    if (entry.brief.fecha !== todayISO()) return null;
    return entry.brief;
  } catch {
    return null;
  }
}

function writeCache(brief: Brief): void {
  try {
    const entry: CacheEntry = { brief, cachedAt: Date.now() };
    fs.writeFileSync(CACHE_FILE, JSON.stringify(entry), "utf-8");
  } catch (err) {
    console.warn("[brief] No se pudo escribir cache:", (err as Error).message);
  }
}

// ─── Selección de artículos ───────────────────────────────────────────────────

async function selectArticles() {
  const { items: allItems } = await fetchNewsByCategory("all", 120);

  // Interleave por categoría para diversidad
  const priorityOrder: Category[] = [
    "economia", "finanzas", "mercados", "negocios", "innovacion", "emprendimiento",
  ];
  const byCategory: Partial<Record<Category, typeof allItems>> = {};
  for (const item of allItems) {
    if (!byCategory[item.categoria]) byCategory[item.categoria] = [];
    byCategory[item.categoria]!.push(item);
  }

  const curated: typeof allItems = [];
  for (let round = 0; curated.length < MAX_ARTICLES; round++) {
    let added = 0;
    for (const cat of priorityOrder) {
      const pool = byCategory[cat] ?? [];
      if (pool[round]) { curated.push(pool[round]); added++; }
      if (curated.length >= MAX_ARTICLES) break;
    }
    if (added === 0) break;
  }
  return curated;
}

// ─── Fallback sin IA ──────────────────────────────────────────────────────────

const TEMA_MAP: Record<Category, BriefTema> = {
  economia: "Chile", finanzas: "Mercados", mercados: "Mercados",
  negocios: "Empresas", innovacion: "Innovación", emprendimiento: "Emprendimiento",
  marketing: "Empresas", estrategia: "Empresas",
};

const OFF_TOPIC = /\b(asesinato|atentado|víctimas|heridos|muertos|farc|guerrilla|sismo|terremoto|incendio forestal|deportivo|fútbol|futbol|boxeo|pelea|concierto|farándula|serie de tv|película|oscar)\b/i;

function inferTema(item: { categoria: Category; pais: string }): BriefTema {
  if (item.pais === "Chile") return TEMA_MAP[item.categoria] === "Chile" ? "Chile" : TEMA_MAP[item.categoria];
  if (["USA","UK","Global"].includes(item.pais)) return "Global";
  return TEMA_MAP[item.categoria] ?? "Global";
}

function buildFallbackBrief(
  items: Awaited<ReturnType<typeof fetchNewsByCategory>>["items"],
  fechaISO: string,
  fechaHoy: string
): Brief {
  const filtered = items
    .filter((it) => !OFF_TOPIC.test(`${it.titulo} ${it.resumen}`))
    .filter((it) => it.titulo.length > 20 && it.resumen.length > 30);

  const seenFuentes = new Set<string>();
  const diverse = filtered.filter((it) => {
    if (seenFuentes.has(it.fuente)) return false;
    seenFuentes.add(it.fuente);
    return true;
  });

  const briefItems: BriefItem[] = diverse.slice(0, 6).map((it) => ({
    titulo: it.titulo,
    resumen: it.resumen,
    porQueImporta: "",
    fuente: it.fuente,
    link: it.link,
    categoria: it.categoria,
    tema: inferTema(it),
  }));

  return {
    fecha: fechaISO,
    titulo: `Brief del día — ${capitalize(fechaHoy)}`,
    intro: "Las principales noticias económicas y de negocios del día, recopiladas desde más de 45 fuentes verificadas.",
    generadoEn: new Date().toISOString(),
    fuenteIA: false,
    items: briefItems,
  };
}

// ─── Generación con Claude ────────────────────────────────────────────────────

async function generateWithClaude(fechaISO: string, fechaHoy: string): Promise<Brief> {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_CODE_OAUTH_TOKEN;
  const curated = await selectArticles();

  if (!apiKey) {
    console.warn("[brief] Sin API key → fallback RSS");
    return buildFallbackBrief(curated, fechaISO, fechaHoy);
  }

  const articulosTexto = curated
    .map((item, i) =>
      `[${i + 1}] FUENTE: ${item.fuente} | PAÍS: ${item.pais} | TEMA: ${item.categoria}\n` +
      `TÍTULO: ${item.titulo}\n` +
      `RESUMEN: ${item.resumen?.slice(0, 180) || "(sin resumen)"}\n` +
      `URL: ${item.link}`
    )
    .join("\n\n");

  const client = new Anthropic({ apiKey });
  const model = process.env.BRIEF_MODEL ?? "claude-sonnet-4-5";

  const systemPrompt = `Eres el editor jefe de Café Comercial, plataforma económica para profesionales y estudiantes chilenos.

PÚBLICO: Profesionales chilenos (gerentes, analistas, emprendedores, estudiantes). Necesitan saber QUÉ pasó, POR QUÉ importa y QUÉ implica para Chile.

ESTILO: Serio, analítico, sin sensacionalismo. The Economist en español chileno.

RESPONDE ÚNICAMENTE con JSON válido (sin markdown, sin texto extra):
{
  "intro": "2-3 oraciones sobre el ambiente económico del día",
  "items": [
    {
      "titulo": "Título editorial conciso (reformular, no copiar el titular)",
      "resumen": "2-3 oraciones: hecho + contexto + implicación",
      "porQueImporta": "1-2 oraciones de impacto concreto para el chileno: crédito, tipo de cambio, empleo, oportunidades",
      "fuente": "Nombre del medio",
      "link": "URL del artículo",
      "categoria": "economia|finanzas|mercados|negocios|innovacion|emprendimiento",
      "tema": "Chile|Mercados|Global|Innovación|Empresas|Emprendimiento"
    }
  ]
}

REGLAS: 6-8 ítems, al menos 2 de Chile, 1 de mercados, 1 de innovación. Consolidar temas repetidos. Ordenar por relevancia para Chile. Solo noticias económicas/negocios — ignorar política, deportes, farándula.`;

  const userPrompt = `HOY: ${fechaHoy}

ARTÍCULOS (${curated.length}):
${articulosTexto}

Genera el brief en JSON. 6-8 ítems con análisis real.`;

  try {
    console.log(`[brief] Llamando a Claude (${model}) con ${curated.length} artículos...`);
    const message = await client.messages.create({
      model,
      max_tokens: 2500,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "";
    const cleaned = rawText
      .replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();

    const parsed = JSON.parse(cleaned) as {
      intro: string;
      items: Array<{
        titulo: string; resumen: string; porQueImporta: string;
        fuente: string; link: string; categoria: string; tema: string;
      }>;
    };

    const items: BriefItem[] = parsed.items.map((it) => ({
      titulo: it.titulo,
      resumen: it.resumen,
      porQueImporta: it.porQueImporta,
      fuente: it.fuente,
      link: it.link,
      categoria: (it.categoria as Category) || "economia",
      tema: (it.tema as BriefTema) || "Chile",
    }));

    const brief: Brief = {
      fecha: fechaISO,
      titulo: `Brief del día — ${capitalize(fechaHoy)}`,
      intro: parsed.intro,
      generadoEn: new Date().toISOString(),
      fuenteIA: true,
      items,
    };

    console.log(`[brief] ✓ Claude generó ${items.length} ítems`);
    writeCache(brief);
    return brief;

  } catch (err) {
    console.error("[brief] Error Claude:", (err as Error).message, (err as any).status);
    const fallback = buildFallbackBrief(curated, fechaISO, fechaHoy);
    writeCache(fallback);
    return fallback;
  }
}

// ─── API pública ──────────────────────────────────────────────────────────────

let generating = false; // semáforo para evitar generaciones paralelas

/**
 * getDynamicBrief — devuelve el brief del día.
 * Lee del cache /tmp si está fresco (<3h), si no genera con Claude.
 */
export async function getDynamicBrief(): Promise<Brief> {
  // 1. Intentar cache
  const cached = readCache();
  if (cached) {
    console.log("[brief] ✓ Sirviendo desde cache");
    return cached;
  }

  // 2. Generar (con semáforo para no lanzar N requests paralelas)
  if (generating) {
    console.log("[brief] Generación en curso — sirviendo fallback temporal");
    return {
      fecha: todayISO(),
      titulo: `Brief del día — ${capitalize(todayLabel())}`,
      intro: "Preparando el análisis del día…",
      fuenteIA: false,
      items: [],
    };
  }

  generating = true;
  try {
    return await generateWithClaude(todayISO(), todayLabel());
  } finally {
    generating = false;
  }
}

/**
 * forceRegenerate — invalida cache y genera un brief fresco.
 * Llamado por el cron diario.
 */
export async function forceRegenerate(): Promise<Brief> {
  try { fs.unlinkSync(CACHE_FILE); } catch { /* no existe */ }
  generating = false;
  return generateWithClaude(todayISO(), todayLabel());
}
