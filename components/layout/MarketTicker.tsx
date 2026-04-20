"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { MarketTick } from "@/types";

const MOCK: MarketTick[] = [
  { label: "USD/CLP", value: "$950", change: "+0.3%", dir: "up" },
  { label: "UF", value: "$38.420", change: "+0.01%", dir: "up" },
  { label: "EUR/CLP", value: "$1.038", change: "+0.1%", dir: "up" },
  { label: "IPSA", value: "7.218 pts", change: "-0.8%", dir: "down" },
  { label: "Cobre", value: "4,78 USD/lb", change: "+1.2%", dir: "up" },
  { label: "Bitcoin", value: "USD 86.420", change: "-2.1%", dir: "down" },
  { label: "Petróleo WTI", value: "USD 62,4", change: "-0.5%", dir: "down" },
];

function relativeTime(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diff < 1) return "ahora";
  if (diff < 60) return `hace ${diff} min`;
  const h = Math.floor(diff / 60);
  return `hace ${h}h`;
}

function Tick({ t }: { t: MarketTick }) {
  const color =
    t.dir === "up"
      ? "text-emerald-500"
      : t.dir === "down"
        ? "text-red-500"
        : "text-gray-400";
  const Icon =
    t.dir === "up" ? TrendingUp : t.dir === "down" ? TrendingDown : Minus;

  return (
    <span className="inline-flex items-center gap-1.5 shrink-0">
      <span className="text-gray-400 dark:text-gray-500 text-xs">{t.label}</span>
      <span className="text-gray-800 dark:text-gray-200 text-xs font-semibold tabular-nums">
        {t.value}
      </span>
      <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${color}`}>
        <Icon className="w-2.5 h-2.5" />
        {t.change}
      </span>
    </span>
  );
}

export default function MarketTicker() {
  const [tickers, setTickers] = useState<MarketTick[]>(MOCK);
  const [fetchedAt, setFetchedAt] = useState<string>("");
  const [live, setLive] = useState(false);

  useEffect(() => {
    fetch("/api/market")
      .then((r) => r.json())
      .then((d) => {
        if (d?.tickers?.length) {
          setTickers(d.tickers);
          setFetchedAt(d.fetchedAt);
          setLive(true);
        }
      })
      .catch(() => {
        // silencioso — queda mock
      });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 py-1.5 overflow-x-auto scrollbar-hide">
          <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider shrink-0 mr-1">
            Mercados
          </span>
          {tickers.map((t) => (
            <Tick key={t.label} t={t} />
          ))}
          <span className="text-[10px] text-gray-300 dark:text-gray-700 shrink-0 ml-auto hidden sm:block">
            {live && fetchedAt
              ? `Act. ${relativeTime(fetchedAt)} · mindicador.cl`
              : "Cargando…"}
          </span>
        </div>
      </div>
    </div>
  );
}
