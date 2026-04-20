import type { Brief } from "@/types";

export const briefs: Brief[] = [
  {
    fecha: "2026-04-19",
    titulo: "Brief del día — Sábado 19 de abril",
    intro: "Semana cargada: BCCh pausó recortes, el FMI rebajó proyecciones, el cobre sigue subiendo y la reforma previsional avanza en el Congreso.",
    items: [
      {
        titulo: "BCCh mantiene TPM en 5% y sube proyección de inflación",
        resumen: "Decisión unánime. El IPoM revisó la inflación de 3,6% a 4,1% para 2026. Próximo recorte se postergó a julio o septiembre.",
        fuente: "Diario Financiero",
        slug: "df-bcentral-tpm-5-proyecciones-2026",
        categoria: "economia",
      },
      {
        titulo: "FMI recorta crecimiento global a 2.8%",
        resumen: "La revisión más baja desde 2008 (sin pandemia). Las tensiones comerciales se materializan en datos reales.",
        fuente: "Reuters",
        slug: "reuters-imf-growth-2026",
        categoria: "economia",
      },
      {
        titulo: "Cobre alcanza USD 4.78/lb impulsado por China",
        resumen: "PMI manufacturero chino subió a 51.3. La electrificación global sigue siendo el driver estructural de largo plazo.",
        fuente: "Reuters Markets",
        slug: "reuters-cobre-record-china",
        categoria: "mercados",
      },
    ],
  },
];

export function getLatestBrief(): Brief {
  return briefs[0];
}
