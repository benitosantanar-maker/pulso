/**
 * lib/api/indicators.ts
 *
 * Capa 1 — Datos dinámicos: valores reales desde mindicador.cl (API pública)
 * Capa 2 — Valor editorial: insights por persona desde lib/data/datosChile.ts
 *
 * getChileIndicators() fusiona ambas capas y devuelve ChileIndicator[].
 * ISR recomendado: revalidate = 300 (5 minutos), igual que market.ts.
 */

import type { ChileIndicator } from "@/types";
import {
  INDICATOR_INSIGHTS,
  DASHBOARD_INDICATOR_IDS,
} from "@/lib/data/datosChile";

// ─── Tipos internos ───────────────────────────────────────────────────────────

interface MindicadorItem {
  valor: number;
  fecha: string;
  unidad_medida?: string;
}

interface MindicadorRoot {
  dolar?: MindicadorItem;
  uf?: MindicadorItem;
  euro?: MindicadorItem;
  tpm?: MindicadorItem;
  ipc?: MindicadorItem;
  libra_cobre?: MindicadorItem;
  tasa_desempleo?: MindicadorItem;
  bitcoin?: MindicadorItem;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number, decimals = 0): string {
  return new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

function fmtDate(iso: string): string {
  if (!iso) return "–";
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function dirOf(now: number, prev: number): ChileIndicator["dir"] {
  if (now > prev) return "up";
  if (now < prev) return "down";
  return "flat";
}

async function safeFetch(url: string): Promise<unknown> {
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

// ─── Formateadores por indicador ─────────────────────────────────────────────

function formatValue(id: string, valor: number): string {
  switch (id) {
    case "dolar":
    case "euro":
      return `$${fmt(valor)}`;
    case "uf":
      return `$${fmt(valor, 2)}`;
    case "tpm":
      return `${fmt(valor, 2)}%`;
    case "ipc":
      return `${valor >= 0 ? "+" : ""}${fmt(valor, 1)}%`;
    case "libra_cobre":
      return `${fmt(valor, 2)} USD/lb`;
    case "tasa_desempleo":
      return `${fmt(valor, 1)}%`;
    case "bitcoin":
      return `USD ${fmt(valor)}`;
    default:
      return `${fmt(valor, 2)}`;
  }
}

function formatVariation(id: string, now: number, prev: number): string {
  if (prev === 0 || prev === now) return "Sin cambios";
  if (id === "tpm") return "Sin cambios"; // TPM no tiene serie diaria en raíz
  const delta = ((now - prev) / Math.abs(prev)) * 100;
  return `${delta >= 0 ? "+" : ""}${delta.toFixed(2)}%`;
}

function formatPeriod(fecha: string): string {
  if (!fecha) return "–";
  const d = new Date(fecha);
  return d.toLocaleDateString("es-CL", { month: "long", year: "numeric" });
}

// ─── Fetch + merge principal ──────────────────────────────────────────────────

/**
 * Retorna ChileIndicator[] con valores frescos de mindicador.cl
 * fusionados con los insights editoriales de datosChile.ts.
 * Si la API falla, retorna los indicadores con valores placeholder.
 */
export async function getChileIndicators(): Promise<ChileIndicator[]> {
  // Fetch paralelo: raíz (valores actuales) + serie dólar (variación diaria)
  const [root, dolarSerie] = await Promise.all([
    safeFetch("https://mindicador.cl/api"),
    safeFetch("https://mindicador.cl/api/dolar"),
  ]) as [MindicadorRoot | null, { serie?: { valor: number; fecha: string }[] } | null];

  const dolarPrev = dolarSerie?.serie?.[1]?.valor ?? 0;

  const RAW: Record<string, { valor: number; fecha: string }> = {};
  if (root) {
    const map: Record<string, MindicadorItem | undefined> = {
      tpm:            root.tpm,
      ipc:            root.ipc,
      dolar:          root.dolar,
      uf:             root.uf,
      euro:           root.euro,
      libra_cobre:    root.libra_cobre,
      tasa_desempleo: root.tasa_desempleo,
      bitcoin:        root.bitcoin,
    };
    for (const [id, item] of Object.entries(map)) {
      if (item) RAW[id] = { valor: item.valor, fecha: item.fecha };
    }
  }

  return DASHBOARD_INDICATOR_IDS.map((id): ChileIndicator => {
    const meta = INDICATOR_INSIGHTS[id];
    const raw  = RAW[id];
    const now  = raw?.valor ?? 0;
    const prev = id === "dolar" ? dolarPrev : now; // solo dólar tiene variación diaria disponible

    return {
      id,
      name:         meta.name,
      code:         meta.code,
      value:        raw ? formatValue(id, now) : "–",
      numericValue: now,
      variation:    raw ? formatVariation(id, now, prev) : "–",
      dir:          raw && prev ? dirOf(now, prev) : "flat",
      period:       raw ? formatPeriod(raw.fecha) : "–",
      source:       meta.source,
      sourceUrl:    meta.sourceUrl,
      microNota:    meta.microNota,
      insight_student: meta.insight_student,
      insight_worker:  meta.insight_worker,
      insight_citizen: meta.insight_citizen,
      relatedConceptSlug:  meta.relatedConceptSlug,
      relatedConceptLabel: meta.relatedConceptLabel,
    };
  });
}
