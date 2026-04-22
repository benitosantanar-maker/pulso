// ─── Categorías ──────────────────────────────────────────────────────────────

export type Category =
  | "economia"
  | "finanzas"
  | "marketing"
  | "innovacion"
  | "negocios"
  | "estrategia"
  | "mercados"
  | "emprendimiento";

export interface CategoryMeta {
  slug: Category;
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  description: string;
}

// ─── Glosario ────────────────────────────────────────────────────────────────

export interface ConceptoRelacionado {
  label: string; // Nombre visible, e.g. "TPM", "EBITDA"
  slug: string;  // Anchor en /recursos, e.g. "tpm", "ebitda"
}

export interface Recurso {
  slug: string;
  titulo: string;
  descripcion: string;
  tipo: "concepto" | "herramienta" | "lectura" | "dato";
  categoria: Category;
  url?: string;
  contenido?: string;
}

// ─── Noticias curadas (capa editorial interna) ───────────────────────────────

/** Contexto de un ramo universitario vinculado a la noticia */
export interface RamoContexto {
  nombre: string;  // e.g. "Macroeconomía", "Finanzas Corporativas"
  contexto: string; // Cómo usar esta noticia en ese ramo
}

/**
 * Noticia curada con análisis editorial completo.
 * Es la fuente de verdad interna; los componentes consumen EssentialStory
 * (obtenida vía adaptador en lib/api/stories.ts).
 */
export interface Noticia {
  slug: string;
  titulo: string;
  bajada: string;
  resumen: string;
  porQueImporta: string;
  impactoIC: string;
  contenido: string;
  categoria: Category;
  fuente: string;
  fuenteUrl: string;
  fecha: string;
  tiempoLectura: number;
  destacada: boolean;
  principal: boolean;
  imagen?: string;
  tags?: string[];
  conceptosRelacionados?: ConceptoRelacionado[];
  // ── Capa de valor: 3 perspectivas de usuario ──
  paraTusRamos?: RamoContexto[];   // Estudiante: ramos donde aplica
  paraLaPega?: string;              // Profesional: cómo usarla en el trabajo
  paraElBolsillo?: string;          // Ciudadano: impacto en vida cotidiana
}

// ─── EssentialStory — modelo limpio para componentes ─────────────────────────

/**
 * Modelo canónico que consumen EssentialStoryCard y secciones de la home.
 * Se genera vía adaptador noticiaToEssentialStory() en lib/api/stories.ts.
 * En el futuro puede venir de un CMS/BD sin cambiar los componentes.
 */
export interface EssentialStory {
  slug: string;
  title: string;
  bajada: string;
  /** Resumen factual breve (1-2 frases: qué pasó) */
  whatHappened: string;
  /** Perspectiva estudiante — ramos, conceptos, ejemplos para pruebas */
  whyItMatters_student: string;
  /** Perspectiva profesional — empresa, sector, reuniones, entrevistas */
  whyItMatters_worker: string;
  /** Perspectiva ciudadano — bolsillo, empleo, país, políticas */
  whyItMatters_citizen: string;
  source: string;
  sourceUrl: string;
  date: string;
  readTime: number;
  category: Category;
  /** Códigos de indicadores relacionados, e.g. ["tpm", "dolar"] */
  relatedIndicators?: string[];
  relatedConcepts?: ConceptoRelacionado[];
  /** Detalle de ramos (rich version del campo student) */
  paraTusRamos?: RamoContexto[];
  tags?: string[];
}

// ─── ChileIndicator — modelo canónico para indicadores económicos ─────────────

/**
 * Indicador económico con valor dinámico (mindicador.cl)
 * + insights editoriales (lib/data/datosChile.ts).
 * Consume el componente IndicatorCard.
 */
export interface ChileIndicator {
  /** Clave del indicador en mindicador.cl, e.g. "tpm", "dolar", "uf" */
  id: string;
  /** Nombre completo, e.g. "Tasa de Política Monetaria" */
  name: string;
  /** Código corto para mostrar, e.g. "TPM", "USD/CLP" */
  code: string;
  /** Valor formateado para display, e.g. "5,00%", "$950" */
  value: string;
  /** Valor numérico crudo (para cálculos y comparaciones) */
  numericValue: number;
  /** Texto de variación, e.g. "+0,3%", "Sin cambios" */
  variation: string;
  dir: "up" | "down" | "flat";
  /** Período al que corresponde el dato */
  period: string;
  source: string;
  sourceUrl: string;
  // ── Insights editoriales por persona ──────────────────────────────
  /** Cómo aparece en ramos, qué conceptos conecta */
  insight_student: string;
  /** Impacto en empresas, sectores, decisiones de negocio */
  insight_worker: string;
  /** Impacto en vida cotidiana: bolsillo, créditos, empleo */
  insight_citizen: string;
  /** Nota editorial breve (1 línea) */
  microNota?: string;
  // ── Links ─────────────────────────────────────────────────────────
  relatedConceptSlug?: string;
  relatedConceptLabel?: string;
}

// ─── Feed en vivo ─────────────────────────────────────────────────────────────

export interface FeedItem {
  id: string;
  titulo: string;
  resumen: string;
  porQueImporta?: string;
  fuente: string;
  pais: string;
  categoria: Category;
  tags: string[];
  fecha: string;
  link: string;
  esRSS: true;
  origen: "rss" | "scrape";
}

// ─── Brief ────────────────────────────────────────────────────────────────────

export interface BriefItem {
  titulo: string;
  resumen: string;
  fuente: string;
  slug: string;
  categoria: Category;
}

export interface Brief {
  fecha: string;
  titulo: string;
  intro: string;
  items: BriefItem[];
}

// ─── Market ticker (header strip) ─────────────────────────────────────────────

export interface MarketTick {
  label: string;
  value: string;
  change: string;
  dir: "up" | "down" | "flat";
}
