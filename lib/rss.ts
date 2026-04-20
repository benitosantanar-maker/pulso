/**
 * lib/rss.ts — Motor RSS de Café Comercial
 * Solo fuentes en español. Corre exclusivamente en el servidor (Node.js).
 */

import Parser from "rss-parser";
import type { FeedItem, Category } from "@/types";

const parser = new Parser({
  timeout: 8000,
  headers: {
    "User-Agent": "CafeComercial/1.0 (https://cafecomercial.vercel.app)",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
});

// ─── Feeds en español por categoría ─────────────────────────────────────────

export const FEEDS: Record<Category, { url: string; fuente: string }[]> = {
  economia: [
    { url: "https://www.latercera.com/economia/feed/", fuente: "La Tercera" },
    { url: "https://www.latercera.com/pulso/feed/", fuente: "La Tercera Pulso" },
    { url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/economia/portada", fuente: "El País Economía" },
    { url: "https://feeds.bbci.co.uk/mundo/economia/rss.xml", fuente: "BBC Mundo" },
    { url: "https://www.elmostrador.cl/mercados/feed/", fuente: "El Mostrador" },
  ],
  finanzas: [
    { url: "https://www.latercera.com/pulso/feed/", fuente: "La Tercera Pulso" },
    { url: "https://feeds.bbci.co.uk/mundo/economia/rss.xml", fuente: "BBC Mundo" },
    { url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/economia/portada", fuente: "El País" },
  ],
  marketing: [
    { url: "https://www.puromarketing.com/rss.xml", fuente: "Puro Marketing" },
    { url: "https://www.marketingdirecto.com/feed/", fuente: "Marketing Directo" },
    { url: "https://www.america-retail.com/feed/", fuente: "América Retail" },
  ],
  innovacion: [
    { url: "https://www.fayerwayer.com/feed/", fuente: "FayerWayer" },
    { url: "https://feeds.bbci.co.uk/mundo/rss.xml", fuente: "BBC Mundo" },
    { url: "https://cnnespanol.cnn.com/seccion/tecnologia/feed/", fuente: "CNN Español" },
  ],
  negocios: [
    { url: "https://www.latercera.com/feed/", fuente: "La Tercera" },
    { url: "https://www.elmostrador.cl/mercados/feed/", fuente: "El Mostrador" },
    { url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/economia/portada", fuente: "El País" },
  ],
  estrategia: [
    { url: "https://www.latercera.com/pulso/feed/", fuente: "La Tercera Pulso" },
    { url: "https://www.elmostrador.cl/mercados/feed/", fuente: "El Mostrador" },
  ],
  mercados: [
    { url: "https://www.latercera.com/economia/feed/", fuente: "La Tercera" },
    { url: "https://feeds.bbci.co.uk/mundo/economia/rss.xml", fuente: "BBC Mundo" },
    { url: "https://cnnespanol.cnn.com/seccion/negocios/feed/", fuente: "CNN Español" },
  ],
  emprendimiento: [
    { url: "https://www.fayerwayer.com/feed/", fuente: "FayerWayer" },
    { url: "https://www.elmostrador.cl/mercados/feed/", fuente: "El Mostrador" },
    { url: "https://www.america-retail.com/feed/", fuente: "América Retail" },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function stripHtml(html: string | undefined): string {
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
  fuente: string,
  categoria: Category
): FeedItem {
  const raw = stripHtml(
    item.contentSnippet ?? item.content ?? item.summary ?? ""
  );
  const resumen = raw.slice(0, 200).trim();

  return {
    id: item.guid ?? item.link ?? `${fuente}-${Date.now()}-${Math.random()}`,
    titulo: stripHtml(item.title ?? "Sin título"),
    resumen: resumen ? resumen + (raw.length > 200 ? "…" : "") : "",
    fuente,
    categoria,
    fecha: item.pubDate ?? item.isoDate ?? new Date().toISOString(),
    link: item.link ?? "",
    esRSS: true,
  };
}

// ─── API pública ─────────────────────────────────────────────────────────────

export async function getLatestFeedItems(
  categoria: "all" | Category = "all",
  limit = 12
): Promise<{ items: FeedItem[]; fetchedAt: string }> {
  const allItems: FeedItem[] = [];

  const feedMap: [Category, { url: string; fuente: string }[]][] =
    categoria === "all"
      ? (Object.entries(FEEDS) as [Category, { url: string; fuente: string }[]][])
      : [[categoria, FEEDS[categoria]]];

  const perFeedLimit = categoria === "all" ? 2 : 4;

  await Promise.allSettled(
    feedMap.flatMap(([cat, feeds]) =>
      feeds.map(async ({ url, fuente }) => {
        try {
          const feed = await parser.parseURL(url);
          const items = feed.items
            .slice(0, perFeedLimit)
            .map((i) => toFeedItem(i, fuente, cat));
          allItems.push(...items);
        } catch {
          // feed falla silenciosamente
        }
      })
    )
  );

  allItems.sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  // Deduplicar por título similar
  const seen = new Set<string>();
  const deduped = allItems.filter((item) => {
    const key = item.titulo.slice(0, 60).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    items: deduped.slice(0, limit),
    fetchedAt: new Date().toISOString(),
  };
}

export async function getBriefFeedItems(
  limit = 3
): Promise<{ items: FeedItem[]; fetchedAt: string }> {
  const briefCats: Category[] = ["economia", "finanzas", "mercados"];
  const allItems: FeedItem[] = [];

  await Promise.allSettled(
    briefCats.flatMap((cat) =>
      FEEDS[cat].slice(0, 2).map(async ({ url, fuente }) => {
        try {
          const feed = await parser.parseURL(url);
          allItems.push(
            ...feed.items.slice(0, 2).map((i) => toFeedItem(i, fuente, cat))
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

  const seen = new Set<string>();
  const deduped = allItems.filter((item) => {
    const key = item.titulo.slice(0, 60).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    items: deduped.slice(0, limit),
    fetchedAt: new Date().toISOString(),
  };
}
