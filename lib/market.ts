/**
 * lib/market.ts — Datos de mercado en tiempo real
 * Fuente: mindicador.cl (API pública sin auth)
 * Fallback: valores mock estáticos
 */

import type { MarketTick } from "@/types";

interface Mindicador {
  valor: number;
  fecha: string;
}

interface MindicadorAPI {
  dolar?: { serie?: Mindicador[] };
  uf?: { serie?: Mindicador[] };
  euro?: { serie?: Mindicador[] };
  ipc?: { serie?: Mindicador[] };
  utm?: { serie?: Mindicador[] };
}

// ─── Datos mock (fallback si la API falla) ───────────────────────────────────

const MOCK_TICKERS: MarketTick[] = [
  { label: "USD/CLP", value: "$950", change: "+0.3%", dir: "up" },
  { label: "UF", value: "$38.420", change: "+0.01%", dir: "up" },
  { label: "EUR/CLP", value: "$1.038", change: "+0.1%", dir: "up" },
  { label: "IPSA", value: "7.218 pts", change: "-0.8%", dir: "down" },
  { label: "Cobre", value: "4,78 USD/lb", change: "+1.2%", dir: "up" },
  { label: "Bitcoin", value: "USD 86.420", change: "-2.1%", dir: "down" },
  { label: "Petróleo WTI", value: "USD 62,4", change: "-0.5%", dir: "down" },
];

function fmt(n: number, decimals = 0): string {
  return new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

function changeDir(now: number, prev: number): MarketTick["dir"] {
  if (now > prev) return "up";
  if (now < prev) return "down";
  return "flat";
}

function pct(now: number, prev: number): string {
  if (!prev || prev === 0) return "0.0%";
  const p = ((now - prev) / prev) * 100;
  return `${p > 0 ? "+" : ""}${p.toFixed(2)}%`;
}

// ─── Fetch principal ─────────────────────────────────────────────────────────

export async function getMarketTickers(): Promise<{
  tickers: MarketTick[];
  fetchedAt: string;
}> {
  try {
    const res = await fetch("https://mindicador.cl/api", {
      next: { revalidate: 3600 }, // cache 1 hora
    });
    if (!res.ok) throw new Error("mindicador status " + res.status);

    const data: MindicadorAPI = await res.json();

    const dolarSerie = data.dolar?.serie ?? [];
    const ufSerie = data.uf?.serie ?? [];
    const euroSerie = data.euro?.serie ?? [];

    const dolarVal = dolarSerie[0]?.valor ?? 950;
    const dolarPrev = dolarSerie[1]?.valor ?? dolarVal;

    const ufVal = ufSerie[0]?.valor ?? 38420;
    const ufPrev = ufSerie[1]?.valor ?? ufVal;

    const euroVal = euroSerie[0]?.valor ?? 1038;
    const euroPrev = euroSerie[1]?.valor ?? euroVal;

    const tickers: MarketTick[] = [
      {
        label: "USD/CLP",
        value: `$${fmt(dolarVal)}`,
        change: pct(dolarVal, dolarPrev),
        dir: changeDir(dolarVal, dolarPrev),
      },
      {
        label: "UF",
        value: `$${fmt(ufVal, 2)}`,
        change: pct(ufVal, ufPrev),
        dir: changeDir(ufVal, ufPrev),
      },
      {
        label: "EUR/CLP",
        value: `$${fmt(euroVal)}`,
        change: pct(euroVal, euroPrev),
        dir: changeDir(euroVal, euroPrev),
      },
      // IPSA y Cobre no tienen API pública directa — mantenemos mock
      { label: "IPSA", value: "7.218 pts", change: "-0.8%", dir: "down" },
      { label: "Cobre", value: "4,78 USD/lb", change: "+1.2%", dir: "up" },
      { label: "Bitcoin", value: "USD 86.420", change: "-2.1%", dir: "down" },
      { label: "Petróleo WTI", value: "USD 62,4", change: "-0.5%", dir: "down" },
    ];

    return { tickers, fetchedAt: new Date().toISOString() };
  } catch {
    // Fallback silencioso con datos mock
    return { tickers: MOCK_TICKERS, fetchedAt: new Date().toISOString() };
  }
}
