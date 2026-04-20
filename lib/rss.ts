/**
 * lib/rss.ts — DEPRECADO
 * Redirige al nuevo motor en lib/feeds/.
 * Mantener este archivo para compatibilidad con imports existentes.
 */

export { fetchNewsByCategory, ALL_FEEDS, getFeedsForCategory } from "@/lib/feeds";
export type { FeedSource, FetchNewsResult } from "@/lib/feeds";
