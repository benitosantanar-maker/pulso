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

export interface ConceptoRelacionado {
  label: string; // Nombre visible, e.g. "TPM", "EBITDA"
  slug: string;  // Anchor en /recursos, e.g. "tpm", "ebitda"
}

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
  /** Conceptos del glosario mencionados en la noticia — links a /recursos#slug */
  conceptosRelacionados?: ConceptoRelacionado[];
}

export type BriefTema =
  | "Chile"
  | "Mercados"
  | "Global"
  | "Innovación"
  | "Empresas"
  | "Emprendimiento";

export interface BriefItem {
  titulo: string;
  resumen: string;         // 2-3 oraciones con análisis
  porQueImporta: string;   // impacto concreto para el profesional/estudiante chileno
  fuente: string;
  link?: string;           // URL original del artículo
  slug?: string;           // para noticias curadas internas
  categoria: Category;
  tema: BriefTema;         // agrupación temática en la UI
}

export interface Brief {
  fecha: string;
  titulo: string;
  intro: string;           // 2-3 oraciones de contexto del día
  generadoEn?: string;     // ISO timestamp de generación
  fuenteIA?: boolean;      // true si fue generado con Claude
  items: BriefItem[];
}

export interface FeedItem {
  id: string;
  titulo: string;
  resumen: string;
  porQueImporta?: string; // hook para enriquecimiento IA futuro
  fuente: string;
  pais: string;           // "Chile", "México", "LatAm", "Global", "UK", "USA"
  categoria: Category;
  tags: string[];
  fecha: string;
  link: string;           // URL externa — sin slug interno
  esRSS: true;
  origen: "rss" | "scrape";
}

export interface MarketTick {
  label: string;
  value: string;
  change: string;
  dir: "up" | "down" | "flat";
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
