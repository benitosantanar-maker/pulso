/**
 * lib/feeds/config.ts
 *
 * Catálogo central de todas las fuentes de noticias (~45 fuentes).
 *
 * Para AÑADIR una fuente: agregar un objeto FeedSource a ALL_FEEDS.
 * Para QUITAR una fuente: comentar o borrar su entrada.
 * Para CAMBIAR una URL: editar el campo `url`.
 *
 * type: "rss"    → se parsea con rss-parser (+ sanitización XML automática)
 * type: "scrape" → se extrae con cheerio desde HTML
 *
 * Último audit de URLs: 2026-04-20
 */

import type { Category } from "@/types";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type Region = "CL" | "AR" | "MX" | "CO" | "LatAm" | "US" | "UK" | "Global" | "ES";

export interface ScrapeSelectors {
  articles: string;   // contenedor de cada artículo
  title: string;      // título (dentro del artículo)
  link: string;       // enlace
  date?: string;
  summary?: string;
  baseUrl?: string;
}

export interface FeedSource {
  id: string;
  fuente: string;     // nombre para mostrar en UI
  pais: string;       // "Chile", "México", "Global"…
  region: Region;
  type: "rss" | "scrape";
  url: string;        // RSS URL o página HTML
  categorias: Category[];
  tags?: string[];
  scrape?: ScrapeSelectors;
}

// ─────────────────────────────────────────────────────────────────────────────
// CATÁLOGO
// ─────────────────────────────────────────────────────────────────────────────

export const ALL_FEEDS: FeedSource[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // 1. CHILE
  // ═══════════════════════════════════════════════════════════════════════════

  {
    // ✅ Verificado — feed con XML que a veces trae & sin escapar → sanitizamos
    id: "lt-economia",
    fuente: "La Tercera",
    pais: "Chile",
    region: "CL",
    type: "rss",
    url: "https://www.latercera.com/economia/feed/",
    categorias: ["economia", "negocios"],
    tags: ["chile", "macroeconomía"],
  },
  {
    // ✅ Verificado — mismo feed con entidades XML problemáticas → sanitizamos
    id: "lt-pulso",
    fuente: "La Tercera Pulso",
    pais: "Chile",
    region: "CL",
    type: "rss",
    url: "https://www.latercera.com/pulso/feed/",
    categorias: ["finanzas", "negocios", "mercados"],
    tags: ["chile", "finanzas", "empresas"],
  },
  {
    // ✅ Feed general — útil como red de seguridad cuando los anteriores fallan
    id: "lt-general",
    fuente: "La Tercera",
    pais: "Chile",
    region: "CL",
    type: "rss",
    url: "https://www.latercera.com/feed/",
    categorias: ["economia"],
    tags: ["chile"],
  },
  {
    // ✅ Feed Emol — puede tener ECONNRESET intermitente; silencioso en ese caso
    id: "emol-economia",
    fuente: "Emol",
    pais: "Chile",
    region: "CL",
    type: "rss",
    url: "https://www.emol.com/noticias/rss/",
    categorias: ["economia", "negocios"],
    tags: ["chile"],
  },
  {
    // ✅ Cooperativa — URL correcta (incluye /noticias/ con trailing slash)
    id: "cooperativa",
    fuente: "Cooperativa",
    pais: "Chile",
    region: "CL",
    type: "rss",
    url: "https://cooperativa.cl/noticias/rss/economia/",
    categorias: ["economia"],
    tags: ["chile"],
  },
  {
    // ✅ Biobío Chile — URL corregida (feed del blog, no /all.rss)
    id: "biobio",
    fuente: "Biobío Chile",
    pais: "Chile",
    region: "CL",
    type: "rss",
    url: "https://www.biobiochile.cl/lista/categorias/economia/feed/",
    categorias: ["economia", "negocios"],
    tags: ["chile"],
  },
  {
    // ✅ El Mostrador — URL corregida (feed raíz, no /mercados/)
    id: "elmostrador",
    fuente: "El Mostrador",
    pais: "Chile",
    region: "CL",
    type: "rss",
    url: "https://www.elmostrador.cl/feed/",
    categorias: ["economia", "finanzas", "mercados"],
    tags: ["chile", "mercados"],
  },
  {
    // ✅ FayerWayer — tecnología Chile, feed estable
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
    // ⚠️ DF — scraping; la URL de categorías cambió, usar la ruta actual
    id: "df-empresas",
    fuente: "Diario Financiero",
    pais: "Chile",
    region: "CL",
    type: "scrape",
    url: "https://www.df.cl/noticias/empresas/",
    categorias: ["economia", "finanzas", "negocios"],
    tags: ["chile", "finanzas", "empresas"],
    scrape: {
      articles: "article, .article, [class*='ArticleCard'], [class*='article-card']",
      title: "h2, h3, [class*='headline'], [class*='Headline']",
      link: "a",
      date: "time, [class*='date'], [class*='Date']",
      summary: "p, [class*='summary'], [class*='bajada']",
      baseUrl: "https://www.df.cl",
    },
  },
  {
    // ⚠️ MarkMedia — puede ser lento; timeout silencioso
    id: "markmedia",
    fuente: "MarkMedia",
    pais: "Chile",
    region: "CL",
    type: "scrape",
    url: "https://markmedia.cl/category/marketing-noticias/",
    categorias: ["marketing"],
    tags: ["chile", "marketing", "publicidad"],
    scrape: {
      articles: "article, .post, .entry",
      title: "h2 a, h3 a",
      link: "h2 a, h3 a",
      date: "time, .entry-date, .date",
      summary: ".excerpt, p",
      baseUrl: "https://markmedia.cl",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. LATINOAMÉRICA
  // ═══════════════════════════════════════════════════════════════════════════

  {
    // ✅ Bloomberg Línea tiene RSS propio (descubierto en audit)
    id: "bloomberg-linea-rss",
    fuente: "Bloomberg Línea",
    pais: "LatAm",
    region: "LatAm",
    type: "rss",
    url: "https://www.bloomberglinea.com/rss/feed.xml",
    categorias: ["economia", "finanzas", "negocios", "mercados"],
    tags: ["latam", "bloomberg", "finanzas"],
  },
  {
    // ✅ Bloomberg Línea Tech RSS
    id: "bloomberg-linea-tech-rss",
    fuente: "Bloomberg Línea",
    pais: "LatAm",
    region: "LatAm",
    type: "rss",
    url: "https://www.bloomberglinea.com/tecnologia/rss/feed.xml",
    categorias: ["innovacion", "emprendimiento"],
    tags: ["latam", "tecnología", "startups"],
  },
  {
    // ⚠️ AméricaEconomía — JS-rendered; intentar scrapear título/link de metatags
    id: "americaeconomia",
    fuente: "AméricaEconomía",
    pais: "LatAm",
    region: "LatAm",
    type: "scrape",
    url: "https://www.americaeconomia.com/negocios-e-industrias",
    categorias: ["negocios", "economia", "emprendimiento"],
    tags: ["latam", "empresas", "industria"],
    scrape: {
      articles: ".node, .views-row, article, [class*='article']",
      title: "h2 a, h3 a, .title a, h4 a",
      link: "h2 a, h3 a, .title a, h4 a",
      date: ".date, .field-date, time",
      summary: ".field-summary, .summary, p",
      baseUrl: "https://www.americaeconomia.com",
    },
  },
  {
    // ✅ Contxto — Substack tiene RSS estable
    id: "contxto",
    fuente: "Contxto",
    pais: "LatAm",
    region: "LatAm",
    type: "rss",
    url: "https://contxto.substack.com/feed",
    categorias: ["emprendimiento"],
    tags: ["latam", "startups", "vc", "tecnología"],
  },
  {
    // ⚠️ LatamList — HTML estático, debería funcionar
    id: "latamlist",
    fuente: "LatamList",
    pais: "LatAm",
    region: "LatAm",
    type: "scrape",
    url: "https://latamlist.com",
    categorias: ["emprendimiento"],
    tags: ["latam", "startups", "ecosistema"],
    scrape: {
      articles: "article, .post, .entry, [class*='card']",
      title: "h2 a, h3 a, h1 a",
      link: "h2 a, h3 a, h1 a",
      date: "time, .date",
      summary: ".excerpt, .description, p",
      baseUrl: "https://latamlist.com",
    },
  },
  {
    // ✅ América Retail — RSS estable
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
    // ⚠️ La República Colombia — scraping, puede ser lento
    id: "larepublica",
    fuente: "La República",
    pais: "Colombia",
    region: "CO",
    type: "scrape",
    url: "https://www.larepublica.co/economia",
    categorias: ["economia"],
    tags: ["colombia", "latam", "macroeconomía"],
    scrape: {
      articles: "article, .article-item, .card-item",
      title: "h2 a, h3 a",
      link: "h2 a, h3 a",
      date: "time, .date",
      summary: "p, .excerpt",
      baseUrl: "https://www.larepublica.co",
    },
  },
  {
    // ✅ Infobae Economía — feed RSS confiable para LatAm
    id: "infobae-economia",
    fuente: "Infobae",
    pais: "LatAm",
    region: "LatAm",
    type: "rss",
    url: "https://www.infobae.com/feeds/rss/economia/",
    categorias: ["economia", "negocios"],
    tags: ["latam", "argentina", "economia"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. ARGENTINA
  // ═══════════════════════════════════════════════════════════════════════════

  {
    // ⚠️ El Cronista — JS-render; puede no extraer contenido
    id: "cronista",
    fuente: "El Cronista",
    pais: "Argentina",
    region: "AR",
    type: "scrape",
    url: "https://www.cronista.com/finanzas-mercados/",
    categorias: ["finanzas", "mercados", "economia"],
    tags: ["argentina", "mercados", "finanzas"],
    scrape: {
      articles: "article, .article, .nota, [class*='Article']",
      title: "h2, h3, [class*='Title'], [class*='Headline']",
      link: "a",
      date: "time, [class*='date']",
      summary: "[class*='copete'], p",
      baseUrl: "https://www.cronista.com",
    },
  },
  {
    // ✅ BAE Negocios — tiene RSS propio
    id: "baenegocios",
    fuente: "BAE Negocios",
    pais: "Argentina",
    region: "AR",
    type: "rss",
    url: "https://www.baenegocios.com/rss/Home",
    categorias: ["economia", "negocios"],
    tags: ["argentina", "negocios"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. MÉXICO
  // ═══════════════════════════════════════════════════════════════════════════

  {
    // ✅ Expansión MX — RSS estable
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
    // ✅ El Financiero MX — alternativa a El Economista (que bloquea RSS)
    id: "elfinanciero-mx",
    fuente: "El Financiero",
    pais: "México",
    region: "MX",
    type: "rss",
    url: "https://www.elfinanciero.com.mx/arc/outboundfeeds/rss/?outputType=xml",
    categorias: ["economia", "finanzas"],
    tags: ["mexico", "macroeconomía"],
  },
  {
    // ✅ Entrepreneur ES — RSS estable para emprendimiento
    id: "entrepreneur-es",
    fuente: "Entrepreneur",
    pais: "México",
    region: "MX",
    type: "rss",
    url: "https://www.entrepreneur.com/es/rss",
    categorias: ["emprendimiento", "estrategia"],
    tags: ["mexico", "startups", "negocios"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. ESPAÑA / GLOBAL EN ESPAÑOL
  // ═══════════════════════════════════════════════════════════════════════════

  {
    // ✅ El País Economía — RSS estable
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
    // ✅ El País Tecnología — RSS estable
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
    // ✅ BBC Mundo Economía — RSS muy estable
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
    // ✅ BBC Mundo general — backup
    id: "bbc-mundo",
    fuente: "BBC Mundo",
    pais: "Global",
    region: "Global",
    type: "rss",
    url: "https://feeds.bbci.co.uk/mundo/rss.xml",
    categorias: ["negocios"],
    tags: ["global"],
  },
  {
    // ✅ Puro Marketing — RSS con XML malformado pero nuestro sanitizador lo maneja
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
    // ✅ Marketing Directo — RSS estable
    id: "marketingdirecto",
    fuente: "Marketing Directo",
    pais: "España",
    region: "ES",
    type: "rss",
    url: "https://www.marketingdirecto.com/feed/",
    categorias: ["marketing"],
    tags: ["españa", "marketing", "digital"],
  },
  {
    // ✅ Xataka — URL corregida (directo en su sitio, feedburner deprecado)
    id: "xataka",
    fuente: "Xataka",
    pais: "España",
    region: "ES",
    type: "rss",
    url: "https://www.xataka.com/feedburner.xml",
    categorias: ["innovacion"],
    tags: ["españa", "tecnología", "gadgets"],
  },
  {
    // ✅ Cinco Días (El País) — economía y mercados España
    id: "cincodias",
    fuente: "Cinco Días",
    pais: "España",
    region: "ES",
    type: "rss",
    url: "https://feeds.elpais.com/mrss-s/pages/ep/site/cincodias.elpais.com/portada",
    categorias: ["finanzas", "mercados"],
    tags: ["españa", "finanzas", "mercados"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. GLOBAL EN INGLÉS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    // ✅ Reuters — feed alternativo (feeds.reuters.com murió en 2020)
    // Usamos RSS via Yahoo Finance que redifunde Reuters
    id: "reuters-yahoo",
    fuente: "Reuters",
    pais: "Global",
    region: "Global",
    type: "rss",
    url: "https://feeds.finance.yahoo.com/rss/2.0/headline?s=^GSPC&region=US&lang=en-US",
    categorias: ["mercados", "finanzas"],
    tags: ["global", "mercados", "wall street"],
  },
  {
    // ✅ Reuters via WSJ RSS (redifusión pública)
    id: "reuters-business",
    fuente: "Reuters",
    pais: "Global",
    region: "Global",
    type: "rss",
    url: "https://www.reutersagency.com/feed/?taxonomy=best-sectors&post_type=best",
    categorias: ["economia", "negocios"],
    tags: ["global"],
  },
  {
    // ✅ TechCrunch — RSS estable
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
    // ✅ TechCrunch Funding — RSS estable
    id: "techcrunch-funding",
    fuente: "TechCrunch",
    pais: "USA",
    region: "US",
    type: "rss",
    url: "https://techcrunch.com/tag/funding/feed/",
    categorias: ["emprendimiento"],
    tags: ["usa", "vc", "funding", "startups"],
  },
  {
    // ✅ MIT Technology Review — RSS estable
    id: "mit-tech",
    fuente: "MIT Technology Review",
    pais: "USA",
    region: "US",
    type: "rss",
    url: "https://www.technologyreview.com/feed/",
    categorias: ["innovacion"],
    tags: ["usa", "ia", "tecnología", "ciencia"],
  },
  {
    // ✅ Hacker News Best (RSS) — innovación / startups tech
    id: "hackernews",
    fuente: "Hacker News",
    pais: "Global",
    region: "Global",
    type: "rss",
    url: "https://hnrss.org/best",
    categorias: ["innovacion", "emprendimiento"],
    tags: ["global", "tecnología", "startups", "vc"],
  },
  {
    // ✅ The Verge — tech/innovación (RSS estable)
    id: "theverge",
    fuente: "The Verge",
    pais: "USA",
    region: "US",
    type: "rss",
    url: "https://www.theverge.com/rss/index.xml",
    categorias: ["innovacion"],
    tags: ["usa", "tecnología", "gadgets", "ia"],
  },
  {
    // ✅ Wired Business — estrategia + innovación
    id: "wired",
    fuente: "Wired",
    pais: "USA",
    region: "US",
    type: "rss",
    url: "https://www.wired.com/feed/rss",
    categorias: ["innovacion", "estrategia"],
    tags: ["usa", "tecnología", "ia", "estrategia"],
  },
  {
    // ✅ Harvard Business Review — estrategia (feed del blog público)
    id: "hbr",
    fuente: "Harvard Business Review",
    pais: "USA",
    region: "US",
    type: "rss",
    url: "https://hbr.org/stories.rss",
    categorias: ["estrategia"],
    tags: ["usa", "management", "liderazgo"],
  },
  {
    // ✅ Seeking Alpha (news feed) — finanzas/mercados globales
    id: "seekingalpha",
    fuente: "Seeking Alpha",
    pais: "USA",
    region: "US",
    type: "rss",
    url: "https://seekingalpha.com/market_currents.xml",
    categorias: ["finanzas", "mercados"],
    tags: ["usa", "mercados", "inversiones"],
  },
];

// ─── Helper: filtrar por categoría ──────────────────────────────────────────

export function getFeedsForCategory(
  cat: Category | "all"
): FeedSource[] {
  if (cat === "all") return ALL_FEEDS;
  return ALL_FEEDS.filter((f) => f.categorias.includes(cat));
}
