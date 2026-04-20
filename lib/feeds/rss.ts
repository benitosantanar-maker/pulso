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
      .slice(0, limit)
      .map((item) => toFeedItem(item, source))
      .filter((item) => item.titulo && item.link);
  } catch (err) {
    console.warn(`[rss] fallo en ${source.fuente} (${source.url}):`, (err as Error).message);
    return [];
  }
}
