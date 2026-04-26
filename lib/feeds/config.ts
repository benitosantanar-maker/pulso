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
  idioma?: "es" | "en"; // default "es"
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
  // ESPAÑA — FINANZAS/NEGOCIOS extra ── 3 fuentes
  // ═══════════════════════════════════════════════════════════════════════════

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
  {
    // Gestión (Perú) — economía y negocios LatAm
    id: "gestion-pe",
    fuente: "Gestión",
    pais: "Perú",
    region: "LatAm",
    type: "rss",
    url: "https://gestion.pe/arc/outboundfeeds/rss/",
    categorias: ["economia", "negocios", "finanzas"],
    tags: ["peru", "latam"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECNOLOGÍA E INNOVACIÓN EN ESPAÑOL ── 5 fuentes
  // ═══════════════════════════════════════════════════════════════════════════

  {
    // Xataka — tecnología en español, referencia hispana
    id: "xataka",
    fuente: "Xataka",
    pais: "España",
    region: "ES",
    type: "rss",
    url: "https://www.xataka.com/feedburner.xml",
    categorias: ["innovacion"],
    tags: ["españa", "tecnología", "ia", "gadgets"],
  },
  {
    // Hipertextual — tecnología y ciencia en español
    id: "hipertextual",
    fuente: "Hipertextual",
    pais: "España",
    region: "ES",
    type: "rss",
    url: "https://hipertextual.com/feed",
    categorias: ["innovacion", "emprendimiento"],
    tags: ["españa", "tecnología", "startups"],
  },
  {
    // Genbeta — software y apps en español
    id: "genbeta",
    fuente: "Genbeta",
    pais: "España",
    region: "ES",
    type: "rss",
    url: "https://www.genbeta.com/feedburner.xml",
    categorias: ["innovacion"],
    tags: ["españa", "tecnología", "digital"],
  },
  {
    // MIT Technology Review en Español
    id: "mit-tech-es",
    fuente: "MIT Technology Review ES",
    pais: "España",
    region: "ES",
    type: "rss",
    url: "https://www.technologyreview.es/feed",
    categorias: ["innovacion"],
    tags: ["global", "ia", "ciencia"],
  },
  {
    // Wired España
    id: "wired-es",
    fuente: "Wired España",
    pais: "España",
    region: "ES",
    type: "rss",
    url: "https://www.wired.com/feed/tag/espanol/rss",
    categorias: ["innovacion", "estrategia"],
    tags: ["españa", "tecnología", "ia"],
  },
];

// ─── Helper ──────────────────────────────────────────────────────────────────

export function getFeedsForCategory(cat: Category | "all"): FeedSource[] {
  if (cat === "all") return ALL_FEEDS;
  return ALL_FEEDS.filter((f) => f.categorias.includes(cat));
}
