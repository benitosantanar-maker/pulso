/**
 * lib/data/brief.ts
 * Brief de fallback — se usa si no hay ANTHROPIC_API_KEY configurada.
 * El brief real y dinámico lo genera lib/brief/generator.ts con Claude.
 */
import type { Brief } from "@/types";

export const briefs: Brief[] = [
  {
    fecha: "2026-04-27",
    titulo: "Brief del día — Lunes 27 de abril",
    intro: "Configura ANTHROPIC_API_KEY en .env.local para activar el brief dinámico generado con IA.",
    fuenteIA: false,
    items: [
      {
        titulo: "BCCh mantiene TPM en 5% y sube proyección de inflación",
        resumen: "Decisión unánime. El IPoM revisó la inflación de 3,6% a 4,1% para 2026. Próximo recorte se postergó a julio o septiembre.",
        porQueImporta: "Sube el costo del crédito hipotecario y de consumo. Posterga el alivio en las cuotas de deudas a tasa variable.",
        fuente: "Diario Financiero",
        slug: "df-bcentral-tpm-5-proyecciones-2026",
        categoria: "economia",
        tema: "Chile",
      },
      {
        titulo: "FMI recorta crecimiento global a 2.8%",
        resumen: "La revisión más baja desde 2008 (sin pandemia). Las tensiones comerciales se materializan en datos reales.",
        porQueImporta: "Menor demanda global presiona exportaciones chilenas de cobre y celulosa. Riesgo de menor inversión extranjera.",
        fuente: "Reuters",
        slug: "reuters-imf-growth-2026",
        categoria: "economia",
        tema: "Global",
      },
      {
        titulo: "Cobre alcanza USD 4.78/lb impulsado por China",
        resumen: "PMI manufacturero chino subió a 51.3. La electrificación global sigue siendo el driver estructural de largo plazo.",
        porQueImporta: "Cada 10 centavos más en el precio del cobre genera ~USD 300M adicionales para el fisco chileno al año.",
        fuente: "Reuters Markets",
        slug: "reuters-cobre-record-china",
        categoria: "mercados",
        tema: "Mercados",
      },
    ],
  },
];

export function getLatestBrief(): Brief {
  return briefs[0];
}
