/**
 * lib/feeds/index.ts
 *
 * Función principal de ingesta: fetchNewsByCategory(category, limit)
 *
 * Flujo:
 *  1. Obtiene las FeedSource correspondientes a la categoría
 *  2. Por cada fuente: RSS → rss.ts | scrape → scraper.ts
 *  3. Combina, deduplica por URL (normalizada) y por título similar
 *  4. Ordena por fecha descendente
 *  5. Devuelve los primeros `limit` items
 *
 * Caché: unstable_cache de Next.js → 30 min por categoría.
 * Así múltiples páginas/componentes comparten el mismo fetch.
 */

import { unstable_cache } from "next/cache";
import { ALL_FEEDS, getFeedsForCategory } from "./config";
import { fetchRSSSource } from "./rss";
import { fetchScrapeSource } from "./scraper";
import type { FeedItem, Category } from "@/types";

// ─── Constantes ───────────────────────────────────────────────────────────────

/** Cada cuántos segundos se regenera el caché (30 min) */
const REVALIDATE_SECONDS = 1800;

/** Items máximos a solicitar por fuente individual (subir = más cobertura, más tiempo de fetch) */
const PER_SOURCE_LIMIT = 12;

// ─── Deduplicación ───────────────────────────────────────────────────────────

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    // Ignorar parámetros UTM y de tracking
    ["utm_source", "utm_medium", "utm_campaign", "ref", "source"].forEach(
      (p) => u.searchParams.delete(p)
    );
    return u.origin + u.pathname;
  } catch {
    return url;
  }
}

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function deduplicate(items: FeedItem[]): FeedItem[] {
  const seenUrls = new Set<string>();
  const seenTitles = new Set<string>();
  const result: FeedItem[] = [];

  for (const item of items) {
    const urlKey = normalizeUrl(item.link);
    const titleKey = normalizeTitle(item.titulo);

    if (seenUrls.has(urlKey) || seenTitles.has(titleKey)) continue;

    seenUrls.add(urlKey);
    seenTitles.add(titleKey);
    result.push(item);
  }

  return result;
}

// ─── Lógica de ingesta (sin caché, no exportada) ─────────────────────────────

async function _fetchNewsByCategory(
  cat: Category | "all",
  limit: number
): Promise<{ items: FeedItem[]; fetchedAt: string; totalSources: number }> {
  const sources = getFeedsForCategory(cat);

  // Paralelizar todos los fetches (allSettled → nunca lanza)
  const results = await Promise.allSettled(
    sources.map((source) =>
      source.type === "rss"
        ? fetchRSSSource(source, PER_SOURCE_LIMIT)
        : fetchScrapeSource(source, PER_SOURCE_LIMIT)
    )
  );

  // Aplanar resultados
  const allItems: FeedItem[] = results.flatMap((r) =>
    r.status === "fulfilled" ? r.value : []
  );

  // Deduplicar y ordenar por fecha
  const unique = deduplicate(allItems);
  unique.sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  const successCount = results.filter((r) => r.status === "fulfilled" && r.value.length > 0).length;
  console.log(
    `[feeds] cat=${cat} sources=${sources.length} ok=${successCount} items=${unique.length}`
  );

  return {
    items: unique.slice(0, limit),
    fetchedAt: new Date().toISOString(),
    totalSources: sources.length,
  };
}

// ─── Versión cacheada (30 min, compartida entre páginas) ─────────────────────

const fetchNewsCached = unstable_cache(
  _fetchNewsByCategory,
  ["cafe-comercial-feeds"],
  { revalidate: REVALIDATE_SECONDS, tags: ["news"] }
);

// ─── API pública ──────────────────────────────────────────────────────────────

export interface FetchNewsResult {
  items: FeedItem[];
  fetchedAt: string;
  totalSources: number;
}

/**
 * fetchNewsByCategory — función principal de la capa de ingesta.
 *
 * @param categoria  "all" | cualquier Category del sistema
 * @param limit      máximo de FeedItem a devolver (default 40)
 * @returns          { items, fetchedAt, totalSources }
 *
 * Nunca lanza; en el peor caso devuelve { items: [], ... }.
 */
export async function fetchNewsByCategory(
  categoria: Category | "all" = "all",
  limit = 40
): Promise<FetchNewsResult> {
  try {
    return await fetchNewsCached(categoria, limit);
  } catch (err) {
    console.error("[feeds] error crítico en fetchNewsByCategory:", err);
    return { items: [], fetchedAt: new Date().toISOString(), totalSources: 0 };
  }
}

/**
 * fetchTendencias — 1 item destacado por cada categoría activa.
 * Usado en la sección "Tendencias del día" del Home.
 * Reutiliza el caché de "all" para no hacer fetches extra.
 */
export async function fetchTendencias(): Promise<{
  byCategory: Partial<Record<Category, FeedItem>>;
  fetchedAt: string;
  total: number;
}> {
  const { items, fetchedAt } = await fetchNewsByCategory("all", 100);

  const byCategory: Partial<Record<Category, FeedItem>> = {};
  for (const item of items) {
    if (!byCategory[item.categoria]) {
      byCategory[item.categoria] = item;
    }
    // Una vez que tenemos 1 por cada categoría posible, podemos salir
    if (Object.keys(byCategory).length >= 8) break;
  }

  return { byCategory, fetchedAt, total: items.length };
}

// ─── Re-exports útiles ────────────────────────────────────────────────────────

export { ALL_FEEDS, getFeedsForCategory } from "./config";
export type { FeedSource } from "./config";
