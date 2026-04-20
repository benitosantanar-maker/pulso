/**
 * lib/rss.ts — Motor RSS de Café Comercial
 * Corre exclusivamente en el servidor (Node.js).
 * Cada feed tiene un fallback silencioso si falla.
 */

import Parser from "rss-parser";
import type { FeedItem } from "@/types";
import type { Category } from "@/types";

const parser = new Parser({
  timeout: 8000,
  headers: {
    "User-Agent": "CafeComercial/1.0 (https://cafecomercial.vercel.app)",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
  customFields: {
    item: [["media:content", "mediaContent"]],
  },
});

// ─── Feeds por categoría ────────────────────────────────────────────────────

export const FEEDS: Record<Category, string[]> = {
  economia: [
    "https://www.latercera.com/economia/feed/",
    "https://www.latercera.com/pulso/feed/",
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/economia/portada",
    "https://rss.nytimes.com/services/xml/rss/nyt/Economy.xml",
  ],
  finanzas: [
    "https://feeds.reuters.com/reuters/businessNews",
    "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
  ],
  marketing: [
    "https://feeds.adweek.com/news",
    "https://digiday.com/marketing/feed/",
    "https://feeds.feedburner.com/entrepreneur/latest",
  ],
  innovacion: [
    "https://techcrunch.com/feed/",
    "https://feeds.feedburner.com/TechCrunch",
  ],
  negocios: [
    "https://feeds.reuters.com/reuters/companyNews",
    "https://rss.nytimes.com/services/xml/rss/nyt/YourMoney.xml",
  ],
  estrategia: [
    "https://hbr.org/stories.rss",
  ],
  mercados: [
    "https://feeds.reuters.com/reuters/businessNews",
    "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
  ],
  emprendimiento: [
    "https://techcrunch.com/feed/",
    "https://feeds.feedburner.com/entrepreneur/latest",
  ],
};

// ─── Fuentes "amigables" para mostrar en UI ─────────────────────────────────

function inferSource(feedUrl: string): string {
  if (feedUrl.includes("latercera")) return "La Tercera";
  if (feedUrl.includes("df.cl")) return "Diario Financiero";
  if (feedUrl.includes("emol")) return "Emol";
  if (feedUrl.includes("reuters")) return "Reuters";
  if (feedUrl.includes("nytimes")) return "New York Times";
  if (feedUrl.includes("elpais")) return "El País";
  if (feedUrl.includes("adweek")) return "AdWeek";
  if (feedUrl.includes("digiday")) return "Digiday";
  if (feedUrl.includes("entrepreneur")) return "Entrepreneur";
  if (feedUrl.includes("techcrunch")) return "TechCrunch";
  if (feedUrl.includes("hbr.org")) return "Harvard Business Review";
  if (feedUrl.includes("ft.com")) return "Financial Times";
  if (feedUrl.includes("economist")) return "The Economist";
  if (feedUrl.includes("marketingbrew")) return "Marketing Brew";
  return new URL(feedUrl).hostname.replace("www.", "");
}

function stripHtml(html: string | undefined): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/g, " ").trim();
}

function toFeedItem(
  item: Parser.Item,
  feedUrl: string,
  categoria: Category
): FeedItem {
  const summary =
    stripHtml(item.contentSnippet ?? item.content ?? item.summary ?? "")
      .slice(0, 200)
      .trim();

  return {
    id: item.guid ?? item.link ?? Math.random().toString(36),
    titulo: stripHtml(item.title ?? "Sin título"),
    resumen: summary ? summary + (summary.length >= 200 ? "…" : "") : "",
    fuente: inferSource(feedUrl),
    categoria,
    fecha: item.pubDate ?? item.isoDate ?? new Date().toISOString(),
    link: item.link ?? feedUrl,
    esRSS: true,
  };
}

// ─── Función principal ───────────────────────────────────────────────────────

/**
 * Obtiene los artículos más recientes del RSS.
 * @param categoria  "all" o una categoría concreta
 * @param limit      cuántos items devolver
 * @returns FeedItem[] ordenados de más nuevo a más antiguo
 */
export async function getLatestFeedItems(
  categoria: "all" | Category = "all",
  limit = 12
): Promise<{ items: FeedItem[]; fetchedAt: string }> {
  const allItems: FeedItem[] = [];

  const feedMap =
    categoria === "all"
      ? (Object.entries(FEEDS) as [Category, string[]][])
      : ([[categoria, FEEDS[categoria]]] as [Category, string[]][]);

  const perFeedLimit = categoria === "all" ? 2 : 4;

  await Promise.allSettled(
    feedMap.flatMap(([cat, urls]) =>
      urls.map(async (url) => {
        try {
          const feed = await parser.parseURL(url);
          const items = feed.items
            .slice(0, perFeedLimit)
            .map((i) => toFeedItem(i, url, cat));
          allItems.push(...items);
        } catch {
          // feed fails silently — mock data sigue disponible
        }
      })
    )
  );

  // Ordenar por fecha más reciente
  allItems.sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  return {
    items: allItems.slice(0, limit),
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Obtiene los top 5 items para el "Brief del día" dinámico.
 * Mezcla economía + finanzas + mercados.
 */
export async function getBriefFeedItems(
  limit = 5
): Promise<{ items: FeedItem[]; fetchedAt: string }> {
  const briefCats: Category[] = ["economia", "finanzas", "mercados"];
  const allItems: FeedItem[] = [];

  await Promise.allSettled(
    briefCats.flatMap((cat) =>
      FEEDS[cat].slice(0, 2).map(async (url) => {
        try {
          const feed = await parser.parseURL(url);
          allItems.push(
            ...feed.items.slice(0, 2).map((i) => toFeedItem(i, url, cat))
          );
        } catch {
          // silencioso
        }
      })
    )
  );

  allItems.sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  return {
    items: allItems.slice(0, limit),
    fetchedAt: new Date().toISOString(),
  };
}
