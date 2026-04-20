/**
 * lib/market.ts — Datos de mercado en tiempo real
 * Fuente: mindicador.cl (API pública sin auth)
 *
 * La raíz /api retorna valores actuales con estructura plana:
 *   { dolar: { valor: 876.32 }, uf: { valor: 39987.35 }, tpm: { valor: 4.5 }, ... }
 *
 * Para variación diaria (%) se consultan las series individuales
 * /api/dolar y /api/uf en paralelo (30 días de historial).
 */

import type { MarketTick } from "@/types";

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface MindicadorItem {
  valor: number;
  fecha: string;
}

/** Estructura raíz de https://mindicador.cl/api */
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

/** Estructura de https://mindicador.cl/api/<indicador> */
interface MindicadorSerie {
  serie: { valor: number; fecha: string }[];
}

// ─── Fallback mock (valores aproximados a abril 2026) ────────────────────────

const MOCK_TICKERS: MarketTick[] = [
  { label: "Dólar",   value: "$876",     change: "–",     dir: "flat" },
  { label: "UF",      value: "$39.987",  change: "–",     dir: "flat" },
  { label: "Euro",    value: "$1.033",   change: "–",     dir: "flat" },
  { label: "TPM",     value: "4,50%",    change: "–",     dir: "flat" },
  { label: "IPC",     value: "-0,2%",    change: "–",     dir: "flat" },
  { label: "Cobre",   value: "5,99 USD/lb", change: "–",  dir: "flat" },
  { label: "Bitcoin", value: "USD 73.857",  change: "–",  dir: "flat" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number, decimals = 0): string {
  return new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

function pct(now: number, prev: number): string {
  if (!prev) return "–";
  const p = ((now - prev) / prev) * 100;
  return `${p >= 0 ? "+" : ""}${p.toFixed(2)}%`;
}

function dir(now: number, prev: number): MarketTick["dir"] {
  if (now > prev) return "up";
  if (now < prev) return "down";
  return "flat";
}

function safeFetch(url: string): Promise<unknown> {
  return fetch(url, { next: { revalidate: 300 } }) // 5 min cache en servidor
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null);
}

// ─── Fetch principal ─────────────────────────────────────────────────────────

export async function getMarketTickers(): Promise<{
  tickers: MarketTick[];
  fetchedAt: string;
}> {
  try {
    // Fetch en paralelo: raíz + series individuales para variación diaria
    const [root, dolarSerie, ufSerie] = await Promise.all([
      safeFetch("https://mindicador.cl/api"),
      safeFetch("https://mindicador.cl/api/dolar"),
      safeFetch("https://mindicador.cl/api/uf"),
    ]) as [MindicadorRoot | null, MindicadorSerie | null, MindicadorSerie | null];

    if (!root) throw new Error("root fetch failed");

    // Variaciones diarias (hoy vs ayer)
    const dolarNow  = root.dolar?.valor ?? 0;
    const dolarPrev = dolarSerie?.serie?.[1]?.valor ?? dolarNow;

    const ufNow  = root.uf?.valor ?? 0;
    const ufPrev = ufSerie?.serie?.[1]?.valor ?? ufNow;

    const euroNow = root.euro?.valor ?? 0;

    const tpm  = root.tpm?.valor ?? 4.5;
    const ipc  = root.ipc?.valor ?? 0;
    const cobre = root.libra_cobre?.valor ?? 0;
    const btc   = root.bitcoin?.valor ?? 0;

    const tickers: MarketTick[] = [
      {
        label: "Dólar",
        value: `$${fmt(dolarNow)}`,
        change: pct(dolarNow, dolarPrev),
        dir: dir(dolarNow, dolarPrev),
      },
      {
        label: "UF",
        value: `$${fmt(ufNow, 2)}`,
        change: pct(ufNow, ufPrev),
        dir: dir(ufNow, ufPrev),
      },
      ...(euroNow > 0 ? [{
        label: "Euro",
        value: `$${fmt(euroNow)}`,
        change: "–",
        dir: "flat" as MarketTick["dir"],
      }] : []),
      {
        label: "TPM",
        value: `${fmt(tpm, 2)}%`,
        change: "–",
        dir: "flat" as MarketTick["dir"],
      },
      {
        label: "IPC",
        value: `${ipc >= 0 ? "+" : ""}${fmt(ipc, 1)}%`,
        change: "–",
        dir: ipc >= 0 ? ("up" as MarketTick["dir"]) : ("down" as MarketTick["dir"]),
      },
      ...(cobre > 0 ? [{
        label: "Cobre",
        value: `${fmt(cobre, 2)} USD/lb`,
        change: "–",
        dir: "flat" as MarketTick["dir"],
      }] : []),
      ...(btc > 0 ? [{
        label: "Bitcoin",
        value: `USD ${fmt(btc)}`,
        change: "–",
        dir: "flat" as MarketTick["dir"],
      }] : []),
    ];

    return { tickers, fetchedAt: new Date().toISOString() };
  } catch {
    return { tickers: MOCK_TICKERS, fetchedAt: new Date().toISOString() };
  }
}
