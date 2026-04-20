"use client";

import { useEffect, useState, useRef } from "react";
import { TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";
import type { MarketTick } from "@/types";

// ─── Fallback visible mientras llega el fetch ─────────────────────────────────

const PLACEHOLDER: MarketTick[] = [
  { label: "Dólar",   value: "–",   change: "–", dir: "flat" },
  { label: "UF",      value: "–",   change: "–", dir: "flat" },
  { label: "TPM",     value: "–",   change: "–", dir: "flat" },
  { label: "IPC",     value: "–",   change: "–", dir: "flat" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function relativeTime(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diff < 1) return "ahora";
  if (diff < 60) return `hace ${diff} min`;
  return `hace ${Math.floor(diff / 60)}h`;
}

// ─── Componente Tick individual ───────────────────────────────────────────────

function Tick({ t }: { t: MarketTick }) {
  const upDown =
    t.dir === "up"
      ? "text-emerald-400"
      : t.dir === "down"
        ? "text-red-400"
        : "text-gray-400";

  const Icon =
    t.dir === "up" ? TrendingUp : t.dir === "down" ? TrendingDown : Minus;

  const showChange = t.change && t.change !== "–";

  return (
    <span className="inline-flex items-center gap-1.5 shrink-0 select-none">
      <span className="text-gray-400 text-[11px] font-medium">{t.label}</span>
      <span className="text-white text-[11px] font-bold tabular-nums">{t.value}</span>
      {showChange && (
        <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${upDown}`}>
          <Icon className="w-2.5 h-2.5" />
          {t.change}
        </span>
      )}
    </span>
  );
}

// ─── Separador ───────────────────────────────────────────────────────────────

function Sep() {
  return <span className="text-gray-700 text-xs select-none">|</span>;
}

// ─── MarketTicker ─────────────────────────────────────────────────────────────

export default function MarketTicker() {
  const [tickers, setTickers] = useState<MarketTick[]>(PLACEHOLDER);
  const [fetchedAt, setFetchedAt] = useState<string>("");
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function loadData() {
    try {
      const res = await fetch("/api/market", { cache: "no-store" });
      const d = await res.json();
      if (d?.tickers?.length) {
        setTickers(d.tickers);
        setFetchedAt(d.fetchedAt);
        setLive(true);
      }
    } catch {
      // silencioso
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    // Refrescar cada 60 minutos en el cliente
    intervalRef.current = setInterval(loadData, 60 * 60 * 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-900 to-teal-950 border-b border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 py-2 overflow-x-auto scrollbar-hide">

          {/* Label fijo */}
          <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest shrink-0">
            Mercados
          </span>

          <Sep />

          {/* Tickers */}
          {tickers.map((t, i) => (
            <span key={t.label} className="contents">
              <Tick t={t} />
              {i < tickers.length - 1 && <Sep />}
            </span>
          ))}

          {/* Timestamp + fuente */}
          <span className="text-[10px] text-gray-600 shrink-0 ml-auto hidden sm:flex items-center gap-1.5">
            {loading ? (
              <RefreshCw className="w-2.5 h-2.5 animate-spin text-gray-600" />
            ) : live && fetchedAt ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
                Act. {relativeTime(fetchedAt)} · mindicador.cl
              </>
            ) : (
              "datos de referencia"
            )}
          </span>

        </div>
      </div>
    </div>
  );
}
