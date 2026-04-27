/**
 * lib/feeds/rss.ts
 * Parsea una fuente RSS y devuelve FeedItem[].
 * Wrapper sobre rss-parser con timeout y error handling.
 */

import Parser from "rss-parser";
import type { FeedItem, Category } from "@/types";
import type { FeedSource } from "./config";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
    "Accept-Language": "es-CL,es;q=0.9,en;q=0.8",
  },
  customFields: { item: [["media:description", "mediaDesc"]] },
});

/**
 * Sanitiza XML malformado antes de parsearlo.
 * Muchos medios chilenos/hispanohablantes tienen & sin escapar en los feeds.
 */
function sanitizeXML(xml: string): string {
  return xml
    // Fix & sin escapar que no sea ya una entidad HTML válida
    .replace(/&(?![a-zA-Z][a-zA-Z0-9]*;|#[0-9]+;|#x[0-9a-fA-F]+;)/g, "&amp;")
    // Fix atributos sin valor en tags HTML incrustados (ej. <br checked>)
    .replace(/<([^>]+)\s([a-zA-Z-]+)(?=\s|>)(?![=])/g, "<$1 $2=\"true\"");
}

/**
 * Versión robusta de parseURL: primero intenta directo,
 * si falla por XML inválido intenta con sanitización.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function parseURL(url: string): Promise<Parser.Output<any>> {
  try {
    return await parser.parseURL(url);
  } catch (err) {
    const msg = (err as Error).message ?? "";
    // Solo reintenta si el error es de XML malformado (no timeout ni 404)
    if (
      msg.includes("Invalid character") ||
      msg.includes("not recognized as RSS") ||
      msg.includes("Attribute without value") ||
      msg.includes("Unquoted attribute")
    ) {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 CafeComercial/2.0",
          Accept: "text/xml, */*",
        },
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw = await res.text();
      return parser.parseString(sanitizeXML(raw));
    }
    throw err;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function stripHtml(html: string | undefined): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toFeedItem(
  item: Parser.Item,
  source: FeedSource
): FeedItem {
  const raw = stripHtml(
    item.contentSnippet ??
    item.content ??
    (item as Record<string, string>).mediaDesc ??
    item.summary ??
    ""
  );
  const resumen = raw.slice(0, 220).trim();

  return {
    id: `${source.id}::${item.guid ?? item.link ?? Date.now()}`,
    titulo: stripHtml(item.title ?? "Sin título"),
    resumen: resumen + (raw.length > 220 ? "…" : ""),
    fuente: source.fuente,
    pais: source.pais,
    categoria: source.categorias[0] as Category, // categoría principal
    tags: source.tags ?? [],
    fecha: item.pubDate ?? item.isoDate ?? new Date().toISOString(),
    link: item.link ?? source.url,
    esRSS: true,
    origen: "rss",
  };
}

// ─── Filtro de relevancia ────────────────────────────────────────────────────

// Palabras que indican artículo fuera de tema económico
const OFF_TOPIC_RE = /\b(deporte|fútbol|futbol|tenis|atletismo|natación|pele|messi|ronaldo|mundial|liga|club deportivo|partido de|baloncesto|basketball|boxeo|pelea|round by round|pelea de|UFC|WWE|F1|fórmula 1|formula 1|GP de|gran premio|olimpiadas|olimpicos|juegos olímpicos|farandula|farándula|novela|serie de tv|película|pelicula|oscar|grammy|grammy|kpop|k-pop|reggaeton|concierto|gira musical|crimen|femicidio|narcotráfico|narcotrafico|policial|accidente de|choque|sismo|terremoto|incendio forestal|moda|fashion week|horóscopo|horoscopo|receta|gastronomia|gastronomía)\b/i;

// Palabras que confirman relevancia económica/negocios
const ON_TOPIC_RE = /\b(economía|economia|mercado|finanzas|inversión|inversion|empresa|pib|inflación|inflacion|tasa|banco|bolsa|acciones|dólar|dolar|uf|cotización|cotizacion|impuesto|presupuesto|exportación|exportacion|importación|importacion|comercio|empleo|desempleo|startup|tecnología|tecnologia|innovación|innovacion|cripto|bitcoin|ia |inteligencia artificial|fusión|fusion|adquisición|adquisicion|ipsa|fed|bch|bcch|fmi|ocde|minería|mineria|energia|energía|litio|cobre|celulosa|retail|pyme|multinacional|capital|deuda|bono|fondo|afp|pensión|pension|salario|sueldo|remunera|aranceles|aranceles|arancele|tarifa|proteccionismo|recesión|recesion)\b/i;

function isRelevant(item: FeedItem, source: FeedSource): boolean {
  // Fuentes especializadas (no generalistas): confiar en su categorización
  if (source.tags?.includes("especializado")) return true;

  const text = `${item.titulo} ${item.resumen}`;

  // Si contiene señales off-topic claras → descartar
  if (OFF_TOPIC_RE.test(text)) return false;

  // Si la URL es un feed especializado (tiene "economia", "mercados", etc.) → confiar
  const urlLower = source.url.toLowerCase();
  if (
    urlLower.includes("economia") ||
    urlLower.includes("finanzas") ||
    urlLower.includes("mercado") ||
    urlLower.includes("negocios") ||
    urlLower.includes("pulso") ||
    urlLower.includes("empresas") ||
    urlLower.includes("tech") ||
    urlLower.includes("innovacion") ||
    urlLower.includes("startup")
  ) return true;

  // Para fuentes generalistas: exigir al menos una señal on-topic
  if (ON_TOPIC_RE.test(text)) return true;

  return false;
}

// ─── Fetch RSS ────────────────────────────────────────────────────────────────

/**
 * Parsea una fuente RSS.
 * @param source  FeedSource de tipo "rss"
 * @param limit   máximo de items a devolver
 * @returns array de FeedItem (vacío si falla)
 */
export async function fetchRSSSource(
  source: FeedSource,
  limit = 8
): Promise<FeedItem[]> {
  try {
    const feed = await parseURL(source.url);
    return feed.items
      .slice(0, limit * 2) // fetch extra to compensate for filtered items
      .map((item) => toFeedItem(item, source))
      .filter((item) => item.titulo && item.link)
      .filter((item) => isRelevant(item, source))
      .slice(0, limit);
  } catch (err) {
    console.warn(`[rss] fallo en ${source.fuente} (${source.url}):`, (err as Error).message);
    return [];
  }
}
