/**
 * lib/feeds/scraper.ts
 * Scrapea páginas HTML con cheerio para extraer artículos de noticias.
 * Se usa como fallback cuando el medio no tiene RSS público.
 *
 * Estrategia de selección:
 *   1. Usa los selectores específicos definidos en FeedSource.scrape
 *   2. Si no encuentra nada, intenta selectores genéricos de noticias
 *   3. Si sigue sin resultado, devuelve array vacío (silencioso)
 */

import * as cheerio from "cheerio";
import type { FeedItem, Category } from "@/types";
import type { FeedSource } from "./config";
import { stripHtml } from "./rss";

// ─── Selectores genéricos (fallback) ─────────────────────────────────────────
//
// Orden de prioridad: del más semántico al más genérico.
// Se prueban en orden hasta que alguno encuentre al menos 2 artículos.

const GENERIC_ARTICLE_SELECTORS = [
  "article",
  "[class*='article']",
  "[class*='story']",
  "[class*='news-item']",
  "[class*='post']",
  "[class*='card']",
  ".nota",
  "li",
];

const GENERIC_TITLE_SELECTORS = [
  "h1 a", "h2 a", "h3 a",
  "h1", "h2", "h3",
  "[class*='headline']",
  "[class*='title']",
];

const GENERIC_SUMMARY_SELECTORS = [
  "[class*='summary']",
  "[class*='description']",
  "[class*='excerpt']",
  "[class*='standfirst']",
  "[class*='bajada']",
  "[class*='copete']",
  "p",
];

const GENERIC_DATE_SELECTORS = [
  "time",
  "[class*='date']",
  "[class*='time']",
  "[class*='fecha']",
  "[datetime]",
];

// ─── Fetch con headers de browser ────────────────────────────────────────────

async function fetchHTML(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "es-CL,es;q=0.9,en;q=0.8",
      "Cache-Control": "no-cache",
    },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} en ${url}`);
  return res.text();
}

// ─── Resolución de URLs relativas ────────────────────────────────────────────

function resolveUrl(href: string | undefined, baseUrl: string): string {
  if (!href) return "";
  try {
    return new URL(href, baseUrl).href;
  } catch {
    return href;
  }
}

// ─── Extractor principal ─────────────────────────────────────────────────────

function extractArticles(
  $: cheerio.CheerioAPI,
  source: FeedSource,
  limit: number
): FeedItem[] {
  const base = source.scrape?.baseUrl ?? source.url;
  const items: FeedItem[] = [];

  // ── Selector de contenedores ──────────────────────────────────────────────
  const containerSelector =
    source.scrape?.articles ??
    GENERIC_ARTICLE_SELECTORS.find((sel) => $(sel).length >= 2) ??
    "article";

  const containers = $(containerSelector).slice(0, limit * 2); // margen extra

  containers.each((_, el) => {
    if (items.length >= limit) return false;

    const $el = $(el);

    // ── Título ───────────────────────────────────────────────────────────────
    const titleSel = source.scrape?.title ?? GENERIC_TITLE_SELECTORS.join(", ");
    const $titleEl = $el.find(titleSel).first();
    const titulo = stripHtml($titleEl.text() || $titleEl.attr("title") || "");
    if (!titulo || titulo.length < 10) return; // skip elementos sin título

    // ── Link ─────────────────────────────────────────────────────────────────
    const linkSel = source.scrape?.link ?? "a";
    let href =
      $el.find(linkSel).first().attr("href") ??
      $el.find("a").first().attr("href") ??
      "";
    href = resolveUrl(href, base);
    if (!href || href === base) return; // skip enlaces vacíos o autoref

    // ── Resumen ──────────────────────────────────────────────────────────────
    const summarySel =
      source.scrape?.summary ?? GENERIC_SUMMARY_SELECTORS.join(", ");
    const rawSummary = stripHtml($el.find(summarySel).first().text());
    const resumen = rawSummary.slice(0, 220).trim() + (rawSummary.length > 220 ? "…" : "");

    // ── Fecha ─────────────────────────────────────────────────────────────────
    const dateSel = source.scrape?.date ?? GENERIC_DATE_SELECTORS.join(", ");
    const $dateEl = $el.find(dateSel).first();
    const rawDate =
      $dateEl.attr("datetime") ??
      $dateEl.attr("data-date") ??
      $dateEl.text().trim();
    const fecha = rawDate ? new Date(rawDate).toISOString() : new Date().toISOString();

    items.push({
      id: `${source.id}::${href}`,
      titulo,
      resumen,
      fuente: source.fuente,
      pais: source.pais,
      categoria: source.categorias[0] as Category,
      tags: source.tags ?? [],
      fecha,
      link: href,
      esRSS: true,
      origen: "scrape",
    });
  });

  return items;
}

// ─── API pública ──────────────────────────────────────────────────────────────

/**
 * Scrapea una fuente HTML y devuelve FeedItem[].
 * @param source  FeedSource de tipo "scrape"
 * @param limit   máximo de items a devolver
 * @returns array de FeedItem (vacío si falla)
 */
export async function fetchScrapeSource(
  source: FeedSource,
  limit = 8
): Promise<FeedItem[]> {
  try {
    const html = await fetchHTML(source.url);
    const $ = cheerio.load(html);

    // Eliminar elementos no editoriales para no confundirlos con artículos
    $("nav, header, footer, script, style, aside, [class*='ad'], [class*='banner'], [class*='menu']").remove();

    const items = extractArticles($, source, limit);

    if (items.length === 0) {
      console.warn(`[scrape] 0 artículos en ${source.fuente} (${source.url})`);
    }

    return items;
  } catch (err) {
    console.warn(`[scrape] fallo en ${source.fuente} (${source.url}):`, (err as Error).message);
    return [];
  }
}
