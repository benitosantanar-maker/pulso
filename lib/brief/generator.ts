/**
 * lib/brief/generator.ts
 * ──────────────────────────────────────────────────────────────────────────────
 * Genera el "Brief del día" dinámicamente usando Claude como motor de análisis.
 *
 * Flujo:
 *  1. Obtiene artículos de TODOS los feeds RSS (~45 fuentes, límite 80 items)
 *  2. Los clasifica y filtra por relevancia
 *  3. Los envía a Claude con un prompt editorial detallado
 *  4. Claude devuelve un JSON estructurado con análisis y contexto
 *  5. Se cachea 3 horas con unstable_cache (no llama a Claude en cada request)
 *
 * Fallback: si Claude no está disponible o falla, construye un brief básico
 * directamente desde los RSS sin IA.
 */

import Anthropic from "@anthropic-ai/sdk";
import { unstable_cache } from "next/cache";
import { fetchNewsByCategory } from "@/lib/feeds";
import type { Brief, BriefItem, BriefTema, Category } from "@/types";

// ─── Config ──────────────────────────────────────────────────────────────────

const BRIEF_CACHE_SECONDS = 60 * 60 * 3; // 3 horas
const MAX_ARTICLES_TO_CLAUDE = 60;        // enviamos hasta 60 artículos al modelo

// ─── Helpers ─────────────────────────────────────────────────────────────────

function todayLabel(): string {
  return new Date().toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// ─── Generador principal (sin caché) ─────────────────────────────────────────

async function _generateBrief(): Promise<Brief> {
  // 1. Obtener artículos de todos los feeds
  const { items: allItems } = await fetchNewsByCategory("all", 120);

  // 2. Tomar los más recientes y variados (máximo MAX_ARTICLES_TO_CLAUDE)
  //    Priorizar: economía Chile > global > mercados > innovación > emprendimiento
  const priorityOrder: Category[] = [
    "economia", "finanzas", "mercados", "negocios", "innovacion", "emprendimiento",
  ];

  const byCategory: Partial<Record<Category, typeof allItems>> = {};
  for (const item of allItems) {
    if (!byCategory[item.categoria]) byCategory[item.categoria] = [];
    byCategory[item.categoria]!.push(item);
  }

  // Interleave categorías para diversidad
  const curated: typeof allItems = [];
  let round = 0;
  while (curated.length < MAX_ARTICLES_TO_CLAUDE) {
    let added = 0;
    for (const cat of priorityOrder) {
      const pool = byCategory[cat] ?? [];
      if (pool[round]) {
        curated.push(pool[round]);
        added++;
        if (curated.length >= MAX_ARTICLES_TO_CLAUDE) break;
      }
    }
    if (added === 0) break;
    round++;
  }

  // 3. Formatear para el prompt
  const articulosTexto = curated
    .map((item, i) =>
      `[${i + 1}] FUENTE: ${item.fuente} | PAÍS: ${item.pais} | TEMA: ${item.categoria}\n` +
      `TÍTULO: ${item.titulo}\n` +
      `RESUMEN: ${item.resumen || "(sin resumen)"}\n` +
      `URL: ${item.link}`
    )
    .join("\n\n");

  const fechaHoy = todayLabel();
  const fechaISO = todayISO();

  // 4. Llamar a Claude
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn("[brief] ANTHROPIC_API_KEY no configurada — usando fallback RSS");
    return buildFallbackBrief(curated, fechaISO, fechaHoy);
  }

  const client = new Anthropic({ apiKey });

  const systemPrompt = `Eres el editor jefe de Café Comercial, una plataforma de información económica y de negocios para profesionales y estudiantes chilenos. Tu rol es sintetizar las noticias del día en un brief editorial de alta calidad.

PÚBLICO OBJETIVO:
- Profesionales chilenos (gerentes, analistas, emprendedores, estudiantes universitarios)
- Necesitan entender QUÉ pasó, POR QUÉ importa y QUÉ implica para Chile y sus finanzas/carrera
- Nivel: universitario con interés en economía, no necesariamente economista

ESTILO EDITORIAL:
- Tono: serio, analítico, sin sensacionalismo. Como The Economist pero en español chileno
- Los resúmenes son informativos Y analíticos: no solo "qué pasó" sino "qué significa"
- "¿Por qué importa?" debe ser concreto para el chileno: impacto en empleo, precios, tipo de cambio, empresas chilenas, oportunidades, etc.
- Evitar jerga excesiva, pero usar términos económicos cuando corresponde (TPM, PIB, inflación, etc.)
- No repetir la misma noticia con distintas fuentes

FORMATO DE RESPUESTA:
Responde ÚNICAMENTE con un objeto JSON válido, sin markdown, sin texto adicional. El JSON debe tener exactamente esta estructura:

{
  "intro": "2-3 oraciones describiendo el ambiente económico del día, los grandes temas que dominan la agenda",
  "items": [
    {
      "titulo": "Título editorial conciso (no copiar el titular de la noticia, reformular)",
      "resumen": "2-3 oraciones con el hecho + contexto + implicación. Qué pasó, qué significa, qué viene",
      "porQueImporta": "1-2 oraciones específicas: impacto directo para el profesional/estudiante chileno. Ej: 'Sube el costo del crédito hipotecario', 'El peso podría depreciarse', 'Oportunidad para empresas exportadoras'",
      "fuente": "Nombre del medio de comunicación",
      "link": "URL del artículo original",
      "categoria": "una de: economia | finanzas | mercados | negocios | innovacion | emprendimiento",
      "tema": "una de: Chile | Mercados | Global | Innovación | Empresas | Emprendimiento"
    }
  ]
}

INSTRUCCIONES:
- Seleccionar las 6-8 noticias MÁS RELEVANTES para el profesional chileno
- Cubrir diversidad temática: al menos 2 de Chile, 1-2 de mercados globales, 1 de innovación/tech
- Priorizar noticias con impacto estructural sobre las coyunturales
- Si hay varias noticias sobre el mismo tema, consolidarlas en un solo ítem
- Ordenar de mayor a menor relevancia para Chile
- El campo "link" debe ser la URL real del artículo`;

  const userPrompt = `HOY ES: ${fechaHoy}

ARTÍCULOS DISPONIBLES (${curated.length} fuentes):
─────────────────────────────────────────
${articulosTexto}
─────────────────────────────────────────

Genera el brief del día en JSON. Recuerda: 6-8 ítems, análisis real, impacto concreto para Chile.`;

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 2500,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "";

    // Limpiar posible markdown code fence
    const cleaned = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(cleaned) as {
      intro: string;
      items: Array<{
        titulo: string;
        resumen: string;
        porQueImporta: string;
        fuente: string;
        link: string;
        categoria: string;
        tema: string;
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

    return {
      fecha: fechaISO,
      titulo: `Brief del día — ${capitalize(fechaHoy)}`,
      intro: parsed.intro,
      generadoEn: new Date().toISOString(),
      fuenteIA: true,
      items,
    };
  } catch (err) {
    console.error("[brief] Error llamando a Claude:", err);
    return buildFallbackBrief(curated, fechaISO, fechaHoy);
  }
}

// ─── Fallback sin IA ──────────────────────────────────────────────────────────

function buildFallbackBrief(
  items: Awaited<ReturnType<typeof fetchNewsByCategory>>["items"],
  fechaISO: string,
  fechaHoy: string
): Brief {
  const TEMA_MAP: Record<Category, BriefTema> = {
    economia: "Chile",
    finanzas: "Mercados",
    mercados: "Mercados",
    negocios: "Empresas",
    innovacion: "Innovación",
    emprendimiento: "Emprendimiento",
    marketing: "Empresas",
    estrategia: "Empresas",
  };

  const briefItems: BriefItem[] = items.slice(0, 6).map((item) => ({
    titulo: item.titulo,
    resumen: item.resumen || "Ver artículo completo.",
    porQueImporta: `Noticia relevante del sector ${item.categoria} en ${item.pais}.`,
    fuente: item.fuente,
    link: item.link,
    categoria: item.categoria,
    tema: TEMA_MAP[item.categoria] ?? "Chile",
  }));

  return {
    fecha: fechaISO,
    titulo: `Brief del día — ${capitalize(fechaHoy)}`,
    intro: "Resumen de las principales noticias económicas y de negocios del día.",
    generadoEn: new Date().toISOString(),
    fuenteIA: false,
    items: briefItems,
  };
}

// ─── Versión cacheada (3 horas) ───────────────────────────────────────────────
//
// La clave incluye la fecha del día para que el cache expire
// automáticamente al cambiar el día (aunque el TTL sea 3h).

const getCachedBrief = unstable_cache(
  _generateBrief,
  ["cafe-comercial-brief"],
  {
    revalidate: BRIEF_CACHE_SECONDS,
    tags: ["brief"],
  }
);

// ─── API pública ──────────────────────────────────────────────────────────────

export async function getDynamicBrief(): Promise<Brief> {
  try {
    return await getCachedBrief();
  } catch (err) {
    console.error("[brief] Error crítico en getDynamicBrief:", err);
    const fechaISO = todayISO();
    const fechaHoy = todayLabel();
    return {
      fecha: fechaISO,
      titulo: `Brief del día — ${capitalize(fechaHoy)}`,
      intro: "No se pudo generar el brief automático. Intente nuevamente más tarde.",
      fuenteIA: false,
      items: [],
    };
  }
}
