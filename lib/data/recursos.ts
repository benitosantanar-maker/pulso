import type { Recurso } from "@/types";

export const recursos: Recurso[] = [
  {
    slug: "tasa-de-politica-monetaria",
    titulo: "Tasa de Política Monetaria (TPM)",
    descripcion: "La tasa de interés de referencia que fija el Banco Central para influir en el costo del crédito y controlar la inflación.",
    tipo: "concepto",
    categoria: "economia",
    contenido: `La TPM es la principal herramienta de política monetaria del Banco Central de Chile. Al subirla, el crédito se encarece y el consumo e inversión se frenan (útil para combatir inflación). Al bajarla, se estimula la actividad económica. El Banco Central revisa la TPM en reuniones regulares de Política Monetaria (RPM), aproximadamente cada 6 semanas.`,
  },
  {
    slug: "ebitda",
    titulo: "EBITDA",
    descripcion: "Earnings Before Interest, Taxes, Depreciation and Amortization. Indicador de rentabilidad operativa que excluye efectos contables y financieros.",
    tipo: "concepto",
    categoria: "finanzas",
    contenido: `El EBITDA mide cuánto genera una empresa de su operación principal, sin considerar cómo se financia (intereses), cuánto paga de impuestos ni el desgaste de sus activos (depreciación y amortización). Se usa ampliamente para comparar empresas entre sí y como base para múltiplos de valoración (EV/EBITDA). Limitación: no es lo mismo que flujo de caja libre.`,
  },
  {
    slug: "unit-economics",
    titulo: "Unit Economics",
    descripcion: "Análisis de rentabilidad por unidad individual (cliente, producto, transacción) para evaluar la viabilidad de un modelo de negocio.",
    tipo: "concepto",
    categoria: "emprendimiento",
    contenido: `Las dos métricas clave son el CAC (Costo de Adquisición de Cliente) y el LTV (Lifetime Value). Un negocio saludable tiene LTV/CAC > 3 y recupera el CAC en menos de 12 meses. En startups, las malas unit economics pueden esconderse detrás del crecimiento; cuando el crecimiento para, el problema queda expuesto.`,
  },
  {
    slug: "five-forces-porter",
    titulo: "Las 5 Fuerzas de Porter",
    descripcion: "Marco de análisis competitivo que evalúa la atractividad de una industria a partir de cinco factores estructurales.",
    tipo: "concepto",
    categoria: "estrategia",
    contenido: `Michael Porter identificó 5 fuerzas que determinan la rentabilidad estructural de una industria: (1) rivalidad entre competidores existentes, (2) amenaza de nuevos entrantes, (3) poder de negociación de proveedores, (4) poder de negociación de clientes, y (5) amenaza de productos sustitutos. A mayor intensidad de estas fuerzas, menor atractivo de la industria. El framework sigue siendo la base del análisis sectorial 40 años después.`,
  },
  {
    slug: "funnel-marketing",
    titulo: "Funnel de Marketing (TOFU, MOFU, BOFU)",
    descripcion: "Modelo que describe el recorrido del cliente desde el primer contacto hasta la compra y fidelización.",
    tipo: "concepto",
    categoria: "marketing",
    contenido: `TOFU (Top of Funnel): etapa de conciencia, el cliente descubre el problema o la marca. MOFU (Middle): etapa de consideración, el cliente evalúa opciones. BOFU (Bottom): etapa de decisión y conversión. Cada etapa requiere contenido y tácticas diferentes. En marketing digital, las métricas cambian: impresiones y reach en TOFU, leads y engagement en MOFU, conversión y CPA en BOFU.`,
  },
  {
    slug: "imf-world-economic-outlook",
    titulo: "IMF World Economic Outlook",
    descripcion: "Publicación semestral del FMI con proyecciones de crecimiento, inflación y análisis de riesgos para la economía global.",
    tipo: "lectura",
    categoria: "economia",
    url: "https://www.imf.org/en/publications/weo",
    contenido: `El WEO se publica dos veces al año (abril y octubre) con actualizaciones en enero y julio. Es la referencia macro global más citada en análisis económicos, informes de política y tesis de inversión. Incluye proyecciones por país y región, análisis temáticos y capítulos especiales sobre riesgos específicos.`,
  },
  {
    slug: "think-with-google",
    titulo: "Think with Google",
    descripcion: "Plataforma de Google con investigación sobre comportamiento del consumidor digital, tendencias de búsqueda e insights de marketing.",
    tipo: "herramienta",
    categoria: "marketing",
    url: "https://business.google.com/uk/think/",
    contenido: `Think with Google ofrece estudios de caso, datos de industria y herramientas como Google Trends. Es útil para fundamentar decisiones de estrategia digital con datos primarios, especialmente en comportamiento del consumidor en el momento de búsqueda e intención de compra.`,
  },
  {
    slug: "world-bank-open-data",
    titulo: "World Bank Open Data",
    descripcion: "Base de datos gratuita del Banco Mundial con miles de indicadores económicos y sociales para todos los países.",
    tipo: "herramienta",
    categoria: "economia",
    url: "https://data.worldbank.org",
    contenido: `La base de datos del Banco Mundial es indispensable para comparativas internacionales: PIB per cápita, pobreza, educación, salud, infraestructura, etc. Ideal para enriquecer análisis con benchmarks globales y series históricas. Tiene API gratuita para descarga programática.`,
  },
];

export function getRecursoBySlug(slug: string): Recurso | undefined {
  return recursos.find((r) => r.slug === slug);
}

export function getRecursosByCategoria(categoria: string): Recurso[] {
  return recursos.filter((r) => r.categoria === categoria);
}

export function getRecursosByTipo(tipo: string): Recurso[] {
  return recursos.filter((r) => r.tipo === tipo);
}
