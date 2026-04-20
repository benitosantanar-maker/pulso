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
}

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

export interface Recurso {
  slug: string;
  titulo: string;
  descripcion: string;
  tipo: "concepto" | "herramienta" | "lectura" | "dato";
  categoria: Category;
  url?: string;
  contenido?: string;
}
