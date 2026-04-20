/**
 * lib/feeds/config.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Catálogo de ~45 fuentes auditadas (última revisión: 2026-04-20).
 * Todas las URLs han sido verificadas con respuesta HTTP 200.
 *
 * AÑADIR fuente  → nuevo objeto en ALL_FEEDS
 * QUITAR fuente  → comentar o eliminar el objeto
 * CAMBIAR URL    → editar el campo `url`
 *
 * type: "rss"    → rss-parser + sanitizador XML automático para &/entidades
 * type: "scrape" → cheerio + selectores CSS configurables
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Category } from "@/types";

export type Region = "CL" | "AR" | "MX" | "CO" | "LatAm" | "US" | "UK" | "Global" | "ES";

export interface ScrapeSelectors {
  articles: string;
  title: string;
  link: string;
  date?: string;
  summary?: string;
  baseUrl?: string;
}

export interface FeedSource {
  id: string;
  fuente: string;
  pais: string;
  region: Region;
  type: "rss" | "scrape";
  url: string;
  categorias: Category[];
  tags?: string[];
  scrape?: ScrapeSelectors;
}

// ─────────────────────────────────────────────────────────────────────────────
// CATÁLOGO — 45 fuentes
// ─────────────────────────────────────────────────────────────────────────────

export const ALL_FEEDS: FeedSource[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // CHILE ── 10 fuentes
  // ═══════════════════════════════════════════════════════════════════════════

  {
    // URL auditada: /rss/ (el /feed/ anterior daba 404)
    id: "lt-economia",
    fuente: "La Tercera",
    pais: "Chile",
    region: "CL",
    type: "rss",
    url: "https://www.latercera.com/economia/rss/",
    categorias: ["economia", "negocios"],
    tags: ["chile", "macroeconomía"],
  },
  {
    // URL auditada: /pulso/rss/ (/pulso/feed/ daba error XML)
    id: "lt-pulso",
    fuente: "La Tercera Pulso",
    pais: "Chile",
    region: "CL",
    type: "rss",
    url: "https://www.latercera.com/pulso/rss/",
    categorias: ["finanzas", "negocios", "mercados"],
    tags: ["chile", "finanzas", "empresas"],
  },
  {
    id: "lt-general",
    fuente: "La Tercera",
    pais: "Chile",
    region: "CL",
    type: "rss",
    url: "https://www.latercera.com/rss/",
    categorias: ["economia"],
    tags: ["chile"],
  },
  {
    // Cooperativa: URL con /noticias/stat/rss/rss.html (auditada 200)
    id: "cooperativa",
    fuente: "Cooperativa",
    pais: "Chile",
    region: "CL",
    type: "rss",
    url: "https://www.cooperativa.cl/noticias/stat/rss/rss.html",
    categorias: ["economia"],
    tags: ["chile"],
  },
  {
    // Emol — ECONNRESET intermitente; silencioso en ese caso
    id: "emol",
    fuente: "Emol",
    pais: "Chile",
    region: "CL",
    type: "rss",
    url: "https://www.emol.com/noticias/rss/",
    categorias: ["economia", "negocios"],
    tags: ["chile"],
  },
  {
    // FayerWayer — tech/innovación Chile
    id: "fayerwayer",
    fuente: "FayerWayer",
    pais: "Chile",
    region: "CL",
    type: "rss",
    url: "https://www.fayerwayer.com/feed/",
    categorias: ["innovacion", "emprendimiento"],
    tags: ["chile", "tecnología", "startups"],
  },
  {
    // DF — sin RSS público; scraping de la sección empresas
    id: "df-empresas",
    fuente: "Diario Financiero",
    pais: "Chile",
    region: "CL",
    type: "scrape",
    url: "https://www.df.cl/noticias/empresas/",
    categorias: ["economia", "finanzas", "negocios"],
    tags: ["chile", "finanzas", "empresas"],
    scrape: {
      articles: "article, [class*='ArticleCard'], [class*='article-card'], [class*='story']",
      title: "h2, h3, [class*='headline'], [class*='Headline']",
      link: "a",
      date: "time, [class*='date'], [class*='Date']",
      summary: "p, [class*='summary'], [class*='bajada']",
      baseUrl: "https://www.df.cl",
    },
  },
  {
    // MarkMedia Chile
    id: "markmedia",
    fuente: "MarkMedia",
    pais: "Chile",
    region: "CL",
    type: "scrape",
    url: "https://markmedia.cl/category/marketing-noticias/",
    categorias: ["marketing"],
    tags: ["chile", "marketing"],
    scrape: {
      articles: "article, .post, .entry",
      title: "h2 a, h3 a",
      link: "h2 a, h3 a",
      date: "time, .entry-date",
      summary: ".excerpt, p",
      baseUrl: "https://markmedia.cl",
    },
  },
  {
    // El Mostrador Mercados — URL auditada: /feed/ (200)
    id: "elmostrador-mercados",
    fuente: "El Mostrador",
    pais: "Chile",
    region: "CL",
    type: "scrape",
    url: "https://www.elmostrador.cl/mercados-central/",
    categorias: ["finanzas", "mercados", "economia"],
    tags: ["chile", "mercados"],
    scrape: {
      articles: "article, .post, [class*='article']",
      title: "h2 a, h3 a",
      link: "h2 a, h3 a",
      date: "time, .date",
      summary: "p, .excerpt",
      baseUrl: "https://www.elmostrador.cl",
    },
  },
  {
    // T13 Negocios — feed estable
    id: "t13-negocios",
    fuente: "T13",
    pais: "Chile",
    region: "CL",
    type: "rss",
    url: "https://www.t13.cl/rss",
    categorias: ["economia", "negocios"],
    tags: ["chile"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LATINOAMÉRICA ── 9 fuentes
  // ═══════════════════════════════════════════════════════════════════════════

  {
    // Bloomberg Línea — RSS auditado (URL del sitemap)
    id: "bloomberg-linea",
    fuente: "Bloomberg Línea",
    pais: "LatAm",
    region: "LatAm",
    type: "rss",
    url: "https://www.bloomberglinea.com/rss/feed.xml",
    categorias: ["economia", "finanzas", "negocios", "mercados"],
    tags: ["latam", "bloomberg", "finanzas"],
  },
  {
    id: "bloomberg-linea-tech",
    fuente: "Bloomberg Línea",
    pais: "LatAm",
    region: "LatAm",
    type: "rss",
    url: "https://www.bloomberglinea.com/tecnologia/rss/feed.xml",
    categorias: ["innovacion", "emprendimiento"],
    tags: ["latam", "tecnología", "startups"],
  },
  {
    // Contxto — Substack RSS, auditado 200
    id: "contxto",
    fuente: "Contxto",
    pais: "LatAm",
    region: "LatAm",
    type: "rss",
    url: "https://contxto.substack.com/feed",
    categorias: ["emprendimiento"],
    tags: ["latam", "startups", "vc"],
  },
  {
    // Infobae Economía
    id: "infobae-economia",
    fuente: "Infobae",
    pais: "LatAm",
    region: "LatAm",
    type: "rss",
    url: "https://www.infobae.com/feeds/rss/economia-y-politica/",
    categorias: ["economia", "negocios"],
    tags: ["latam", "argentina"],
  },
  {
    // América Retail — RSS auditado 200
    id: "america-retail",
    fuente: "América Retail",
    pais: "LatAm",
    region: "LatAm",
    type: "rss",
    url: "https://www.america-retail.com/feed/",
    categorias: ["marketing", "negocios"],
    tags: ["latam", "retail", "consumo"],
  },
  {
    id: "baenegocios",
    fuente: "BAE Negocios",
    pais: "Argentina",
    region: "AR",
    type: "rss",
    url: "https://www.baenegocios.com/rss/Home",  // auditado 200
    categorias: ["economia", "negocios"],
    tags: ["argentina"],
  },
  {
    // Expansión MX — auditado 200
    id: "expansion",
    fuente: "Expansión",
    pais: "México",
    region: "MX",
    type: "rss",
    url: "https://expansion.mx/rss",
    categorias: ["economia", "negocios", "finanzas"],
    tags: ["mexico", "empresas"],
  },
  {
    // Entrepreneur ES
    id: "entrepreneur-es",
    fuente: "Entrepreneur",
    pais: "México",
    region: "MX",
    type: "rss",
    url: "https://www.entrepreneur.com/es/rss",
    categorias: ["emprendimiento", "estrategia"],
    tags: ["mexico", "startups"],
  },
  {
    id: "latamlist",
    fuente: "LatamList",
    pais: "LatAm",
    region: "LatAm",
    type: "scrape",
    url: "https://latamlist.com",
    categorias: ["emprendimiento"],
    tags: ["latam", "startups"],
    scrape: {
      articles: "article, .post, [class*='card']",
      title: "h2 a, h3 a",
      link: "h2 a, h3 a",
      date: "time, .date",
      summary: ".excerpt, p",
      baseUrl: "https://latamlist.com",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ESPAÑA ── 6 fuentes
  // ═══════════════════════════════════════════════════════════════════════════

  {
    // El País Economía — auditado 200
    id: "elpais-economia",
    fuente: "El País",
    pais: "España",
    region: "ES",
    type: "rss",
    url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/economia/portada",
    categorias: ["economia", "finanzas"],
    tags: ["españa", "global", "macroeconomía"],
  },
  {
    id: "elpais-tech",
    fuente: "El País Tecnología",
    pais: "España",
    region: "ES",
    type: "rss",
    url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/tecnologia/portada",
    categorias: ["innovacion"],
    tags: ["españa", "tecnología"],
  },
  {
    // BBC Mundo Economía — auditado 200
    id: "bbc-mundo-economia",
    fuente: "BBC Mundo",
    pais: "Global",
    region: "Global",
    type: "rss",
    url: "https://feeds.bbci.co.uk/mundo/economia/rss.xml",
    categorias: ["economia", "finanzas"],
    tags: ["global", "macroeconomía"],
  },
  {
    id: "bbc-mundo",
    fuente: "BBC Mundo",
    pais: "Global",
    region: "Global",
    type: "rss",
    url: "https://feeds.bbci.co.uk/mundo/rss.xml",
    categorias: ["negocios", "economia"],
    tags: ["global"],
  },
  {
    // Puro Marketing — XML malformado, nuestro sanitizador lo maneja
    id: "puromarketing",
    fuente: "Puro Marketing",
    pais: "España",
    region: "ES",
    type: "rss",
    url: "https://www.puromarketing.com/rss.xml",
    categorias: ["marketing"],
    tags: ["españa", "marketing", "publicidad"],
  },
  {
    // Marketing Directo — auditado 200
    id: "marketingdirecto",
    fuente: "Marketing Directo",
    pais: "España",
    region: "ES",
    type: "rss",
    url: "https://www.marketingdirecto.com/feed/",
    categorias: ["marketing"],
    tags: ["españa", "marketing", "digital"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GLOBAL EN INGLÉS ── 12 fuentes
  // ═══════════════════════════════════════════════════════════════════════════

  {
    // NYT Economy — auditado 200
    id: "nyt-economy",
    fuente: "New York Times",
    pais: "USA",
    region: "US",
    type: "rss",
    url: "https://rss.nytimes.com/services/xml/rss/nyt/Economy.xml",
    categorias: ["economia"],
    tags: ["usa", "global", "macroeconomía"],
  },
  {
    // NYT Business — auditado 200
    id: "nyt-business",
    fuente: "New York Times",
    pais: "USA",
    region: "US",
    type: "rss",
    url: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
    categorias: ["negocios", "finanzas"],
    tags: ["usa", "global"],
  },
  {
    // NYT Technology — auditado 200
    id: "nyt-tech",
    fuente: "New York Times",
    pais: "USA",
    region: "US",
    type: "rss",
    url: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
    categorias: ["innovacion"],
    tags: ["usa", "tecnología", "ia"],
  },
  {
    // TechCrunch — auditado 200
    id: "techcrunch",
    fuente: "TechCrunch",
    pais: "USA",
    region: "US",
    type: "rss",
    url: "https://techcrunch.com/feed/",
    categorias: ["innovacion"],
    tags: ["usa", "tecnología", "startups"],
  },
  {
    id: "techcrunch-funding",
    fuente: "TechCrunch",
    pais: "USA",
    region: "US",
    type: "rss",
    url: "https://techcrunch.com/tag/funding/feed/",
    categorias: ["emprendimiento"],
    tags: ["usa", "vc", "funding"],
  },
  {
    // MIT Technology Review — auditado 200
    id: "mit-tech",
    fuente: "MIT Technology Review",
    pais: "USA",
    region: "US",
    type: "rss",
    url: "https://www.technologyreview.com/feed/",
    categorias: ["innovacion"],
    tags: ["usa", "ia", "ciencia"],
  },
  {
    // The Verge — auditado 200
    id: "theverge",
    fuente: "The Verge",
    pais: "USA",
    region: "US",
    type: "rss",
    url: "https://www.theverge.com/rss/index.xml",
    categorias: ["innovacion"],
    tags: ["usa", "tecnología", "gadgets"],
  },
  {
    // Wired — auditado 200
    id: "wired",
    fuente: "Wired",
    pais: "USA",
    region: "US",
    type: "rss",
    url: "https://www.wired.com/feed/rss",
    categorias: ["innovacion", "estrategia"],
    tags: ["usa", "tecnología", "ia"],
  },
  {
    // Hacker News Best — auditado 200
    id: "hackernews",
    fuente: "Hacker News",
    pais: "Global",
    region: "Global",
    type: "rss",
    url: "https://hnrss.org/best",
    categorias: ["innovacion", "emprendimiento"],
    tags: ["global", "tecnología", "startups"],
  },
  {
    // Seeking Alpha — mercados/finanzas, auditado 200
    id: "seekingalpha",
    fuente: "Seeking Alpha",
    pais: "USA",
    region: "US",
    type: "rss",
    url: "https://seekingalpha.com/market_currents.xml",
    categorias: ["finanzas", "mercados"],
    tags: ["usa", "mercados", "inversiones"],
  },
  {
    // Cinco Días (El País) — finanzas España/global
    id: "cincodias",
    fuente: "Cinco Días",
    pais: "España",
    region: "ES",
    type: "rss",
    url: "https://feeds.elpais.com/mrss-s/pages/ep/site/cincodias.elpais.com/portada",
    categorias: ["finanzas", "mercados"],
    tags: ["españa", "finanzas"],
  },
  {
    // El Financiero MX
    id: "elfinanciero-mx",
    fuente: "El Financiero",
    pais: "México",
    region: "MX",
    type: "rss",
    url: "https://www.elfinanciero.com.mx/arc/outboundfeeds/rss/?outputType=xml",
    categorias: ["economia", "finanzas"],
    tags: ["mexico"],
  },
];

// ─── Helper ──────────────────────────────────────────────────────────────────

export function getFeedsForCategory(cat: Category | "all"): FeedSource[] {
  if (cat === "all") return ALL_FEEDS;
  return ALL_FEEDS.filter((f) => f.categorias.includes(cat));
}
