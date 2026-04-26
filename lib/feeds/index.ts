/**
 * lib/feeds/index.ts
 *
 * Función principal de ingesta: fetchNewsByCategory(category, limit)
 *
 * Flujo:
 *  1. Obtiene las FeedSource en español correspondientes a la categoría
 *  2. Por cada fuente: RSS → rss.ts | scrape → scraper.ts
 *  3. Filtra ítems detectados como inglés (stop-words heurístico)
 *  4. Combina, deduplica por URL (normalizada) y por título similar
 *  5. Ordena por fecha descendente
 *  6. Devuelve los primeros `limit` items
 *
 * Caché: unstable_cache de Next.js → 2 min por categoría.
 */

import { unstable_cache } from "next/cache";
import { ALL_FEEDS, getFeedsForCategory } from "./config";
import { fetchRSSSource } from "./rss";
import { fetchScrapeSource } from "./scraper";
import type { FeedItem, Category, BriefItem } from "@/types";

// ─── Constantes ───────────────────────────────────────────────────────────────

const REVALIDATE_SECONDS = 120;
const PER_SOURCE_LIMIT = 12;

// Categorías core del brief diario (economia, negocios, finanzas primero)
const BRIEF_CATEGORIES: Category[] = [
  "economia", "negocios", "finanzas", "mercados",
  "innovacion", "marketing", "emprendimiento", "estrategia",
];

// ─── Filtro de idioma inglés ─────────────────────────────────────────────────

const EN_STOP_WORDS =
  /\b(the|and|for|that|this|with|from|have|are|was|were|will|would|could|should|their|what|when|where|who|how|says|said|report|new|year|month|week|update|breaking|watch|listen|podcast|video|launches|unveils|raises|billion|million|trillion|shares|stock|market|amid|over|after|before|into|onto|upon|within|without|through|against|between|during|inside|outside|according|following|including|regarding|despite|although|however|therefore|moreover|furthermore)\b/i;

function likelyEnglish(text: string): boolean {
  if (!text || text.length < 10) return false;
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length < 4) return false;
  const hits = words.filter((w) => EN_STOP_WORDS.test(w)).length;
  return hits / words.length > 0.22;
}

function filterSpanish(items: FeedItem[]): FeedItem[] {
  return items.filter((item) => !likelyEnglish(item.titulo));
}

// ─── Deduplicación ───────────────────────────────────────────────────────────

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
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
  // Solo fuentes en español
  const sources = getFeedsForCategory(cat).filter(
    (s) => !s.idioma || s.idioma === "es"
  );

  const results = await Promise.allSettled(
    sources.map((source) =>
      source.type === "rss"
        ? fetchRSSSource(source, PER_SOURCE_LIMIT)
        : fetchScrapeSource(source, PER_SOURCE_LIMIT)
    )
  );

  const allItems: FeedItem[] = results.flatMap((r) =>
    r.status === "fulfilled" ? r.value : []
  );

  const unique = deduplicate(filterSpanish(allItems));
  unique.sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  const successCount = results.filter(
    (r) => r.status === "fulfilled" && r.value.length > 0
  ).length;
  console.log(
    `[feeds] cat=${cat} sources=${sources.length} ok=${successCount} items=${unique.length}`
  );

  return {
    items: unique.slice(0, limit),
    fetchedAt: new Date().toISOString(),
    totalSources: sources.length,
  };
}

// ─── Versión cacheada ─────────────────────────────────────────────────────────

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
    if (Object.keys(byCategory).length >= 8) break;
  }

  return { byCategory, fetchedAt, total: items.length };
}

/**
 * fetchMasLeidas24h — items más relevantes de las últimas 24h.
 * Usa recency + prioridad de categoría como proxy de relevancia.
 * Devuelve hasta `limit` items.
 */
export async function fetchMasLeidas24h(limit = 10): Promise<FeedItem[]> {
  const { items } = await fetchNewsByCategory("all", 120);

  const cutoff24h = Date.now() - 24 * 60 * 60 * 1000;
  const cutoff48h = Date.now() - 48 * 60 * 60 * 1000;

  // Prioridad por categoría para el core del sitio
  const catPriority: Partial<Record<Category, number>> = {
    economia: 10, finanzas: 9, negocios: 8, mercados: 7,
    innovacion: 6, marketing: 5, emprendimiento: 4, estrategia: 3,
  };

  // Intentar con 24h; si hay pocos, ampliar a 48h
  let pool = items.filter(
    (i) => new Date(i.fecha).getTime() >= cutoff24h
  );
  if (pool.length < 5) {
    pool = items.filter(
      (i) => new Date(i.fecha).getTime() >= cutoff48h
    );
  }
  if (pool.length === 0) pool = items;

  // Score: prioridad de categoría + recency bonus
  const now = Date.now();
  pool.sort((a, b) => {
    const aPri = catPriority[a.categoria] ?? 1;
    const bPri = catPriority[b.categoria] ?? 1;
    const aAge = (now - new Date(a.fecha).getTime()) / 3600000; // horas
    const bAge = (now - new Date(b.fecha).getTime()) / 3600000;
    const aScore = aPri - aAge * 0.3;
    const bScore = bPri - bAge * 0.3;
    return bScore - aScore;
  });

  // 1 item por fuente para diversificar
  const seenSources = new Set<string>();
  const result: FeedItem[] = [];
  for (const item of pool) {
    if (!seenSources.has(item.fuente)) {
      seenSources.add(item.fuente);
      result.push(item);
    }
    if (result.length >= limit) break;
  }

  // Si no alcanzamos el límite, rellenar sin restricción de fuente
  if (result.length < limit) {
    for (const item of pool) {
      if (!result.includes(item)) result.push(item);
      if (result.length >= limit) break;
    }
  }

  return result;
}

/**
 * fetchDailyBrief — genera el brief del día a partir del feed.
 * Para un dateStr dado (YYYY-MM-DD), filtra items de esa jornada.
 * Si no hay suficientes, usa los más recientes disponibles.
 */
export interface DailyBriefResult {
  fecha: string;
  items: BriefItem[];
  totalDisponibles: number;
  fetchedAt: string;
}

async function _fetchDailyBrief(
  dateStr: string
): Promise<DailyBriefResult> {
  const { items } = await fetchNewsByCategory("all", 150);

  // Rango del día solicitado (hora local Chile = UTC-3/-4, usamos UTC-4 como proxy)
  const targetDate = new Date(dateStr + "T00:00:00-04:00");
  const nextDate = new Date(targetDate.getTime() + 24 * 60 * 60 * 1000);

  const dayItems = items.filter((i) => {
    const t = new Date(i.fecha).getTime();
    return t >= targetDate.getTime() && t < nextDate.getTime();
  });

  const pool = dayItems.length >= 5 ? dayItems : items;

  // Elegir 1 item por categoría en orden de prioridad
  const selected: BriefItem[] = [];
  const usedIds = new Set<string>();

  for (const cat of BRIEF_CATEGORIES) {
    const candidate = pool.find(
      (i) => i.categoria === cat && !usedIds.has(i.id)
    );
    if (candidate) {
      usedIds.add(candidate.id);
      selected.push({
        titulo: candidate.titulo,
        resumen: candidate.resumen || "",
        fuente: candidate.fuente,
        slug: "",
        link: candidate.link,
        categoria: candidate.categoria,
      });
    }
    if (selected.length >= 8) break;
  }

  return {
    fecha: dateStr,
    items: selected,
    totalDisponibles: pool.length,
    fetchedAt: new Date().toISOString(),
  };
}

const fetchDailyBriefCached = unstable_cache(
  _fetchDailyBrief,
  ["cafe-comercial-brief"],
  { revalidate: 3600, tags: ["brief"] }
);

export async function fetchDailyBrief(dateStr: string): Promise<DailyBriefResult> {
  try {
    return await fetchDailyBriefCached(dateStr);
  } catch (err) {
    console.error("[feeds] error en fetchDailyBrief:", err);
    return { fecha: dateStr, items: [], totalDisponibles: 0, fetchedAt: new Date().toISOString() };
  }
}

/** Retorna los últimos N días en formato YYYY-MM-DD */
export function getLastNDays(n = 7): string[] {
  const days: string[] = [];
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

// ─── Re-exports útiles ────────────────────────────────────────────────────────

export { ALL_FEEDS, getFeedsForCategory } from "./config";
export type { FeedSource } from "./config";
