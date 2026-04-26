"use client";

import { useEffect, useState, useRef } from "react";
import type { MarketTick } from "@/types";

const PLACEHOLDER: MarketTick[] = [
  { label: "Dólar", value: "–", change: "–", dir: "flat" },
  { label: "UF",    value: "–", change: "–", dir: "flat" },
  { label: "TPM",   value: "–", change: "–", dir: "flat" },
  { label: "IPC",   value: "–", change: "–", dir: "flat" },
];

function relativeTime(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diff < 1) return "ahora";
  if (diff < 60) return `hace ${diff} min`;
  return `hace ${Math.floor(diff / 60)}h`;
}

function TickerItem({ t }: { t: MarketTick }) {
  const changeColor =
    t.dir === "up" ? "#4DB87A" : t.dir === "down" ? "#F06B55" : "#8A8680";
  const arrow = t.dir === "up" ? "▲" : t.dir === "down" ? "▼" : "—";
  const showChange = t.change && t.change !== "–";

  return (
    <span
      className="inline-flex items-center gap-1.5 shrink-0 select-none px-7"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      <span
        className="text-[10px] uppercase tracking-[0.08em]"
        style={{ color: "#8A8680" }}
      >
        {t.label}
      </span>
      <span className="text-[11px] font-medium tabular-nums" style={{ color: "#F0EDE8" }}>
        {t.value}
      </span>
      {showChange && (
        <span className="text-[10px] font-medium" style={{ color: changeColor }}>
          {arrow} {t.change}
        </span>
      )}
    </span>
  );
}

export default function MarketTicker() {
  const [tickers, setTickers] = useState<MarketTick[]>(PLACEHOLDER);
  const [fetchedAt, setFetchedAt] = useState<string>("");
  const [live, setLive] = useState(false);
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
    }
  }

  useEffect(() => {
    loadData();
    intervalRef.current = setInterval(loadData, 60 * 60 * 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  /* duplicate items for seamless loop */
  const items = [...tickers, ...tickers];

  return (
    <div
      className="overflow-hidden"
      style={{
        background: "#12100D",
        borderBottom: "1px solid #2A2620",
        height: "34px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Fixed label */}
      <span
        className="shrink-0 font-sans text-[9px] font-semibold uppercase tracking-[0.12em] px-5"
        style={{ color: "#B5450A", whiteSpace: "nowrap" }}
      >
        ▸ Mercados
      </span>
      <span style={{ color: "#2A2620", fontSize: "16px" }}>|</span>

      {/* Scrolling track */}
      <div className="flex-1 overflow-hidden relative">
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "ticker-scroll 40s linear infinite",
          }}
        >
          {items.map((t, i) => (
            <TickerItem key={`${t.label}-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Timestamp */}
      {live && fetchedAt && (
        <span
          className="shrink-0 hidden sm:flex items-center gap-1.5 font-mono text-[10px] px-4"
          style={{ color: "#4A4740", whiteSpace: "nowrap" }}
        >
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#4DB87A" }} />
          {relativeTime(fetchedAt)}
        </span>
      )}
    </div>
  );
}
