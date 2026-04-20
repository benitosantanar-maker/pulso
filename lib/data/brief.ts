import type { Brief } from "@/types";

export const briefs: Brief[] = [
  {
    fecha: "2026-04-19",
    titulo: "Brief del día — Sábado 19 de abril",
    intro: "Semana cargada de señales macro. La Fed habló, el FMI recortó proyecciones y el cobre siguió subiendo. Aquí lo esencial.",
    items: [
      {
        titulo: "La Fed mantiene tasas ante presión de aranceles",
        resumen: "Powell advirtió que los riesgos de inflación y desempleo aumentaron simultáneamente. El próximo recorte se postergó a septiembre.",
        fuente: "Reuters",
        slug: "fed-mantiene-tasa-incertidumbre-aranceles",
        categoria: "economia",
      },
      {
        titulo: "FMI recorta crecimiento global a 2.8%",
        resumen: "La revisión más baja desde 2008 (sin pandemia) apunta a que las tensiones comerciales se están materializando en datos reales.",
        fuente: "IMF WEO",
        slug: "imf-weo-2026-crecimiento-global",
        categoria: "economia",
      },
      {
        titulo: "Cobre alcanza USD 4.78/lb impulsado por China",
        resumen: "El PMI manufacturero chino subió a 51.3. Las apuestas por electrificación siguen siendo el driver estructural de largo plazo.",
        fuente: "Reuters Markets",
        slug: "cobre-precio-record-demanda-china",
        categoria: "mercados",
      },
      {
        titulo: "VC en LATAM cayó 34% en Q1 pero los tickets grandes crecen",
        resumen: "El mercado filtra: menos rondas seed pero más capital para Series B y C. El ecosistema madura.",
        fuente: "TechCrunch",
        slug: "venture-capital-latam-q1-2026",
        categoria: "emprendimiento",
      },
      {
        titulo: "Apple Intelligence llega al español latinoamericano",
        resumen: "iOS 18.4 trae IA nativa a la región. Las empresas deben adaptar políticas de uso especialmente en sectores regulados.",
        fuente: "MIT Tech Review",
        slug: "apple-inteligencia-latam-expansion",
        categoria: "innovacion",
      },
    ],
  },
];

export function getLatestBrief(): Brief {
  return briefs[0];
}
