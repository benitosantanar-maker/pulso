"use client";

import { useEffect, useState } from "react";
import type { MarketTick } from "@/types";

const STATIC_EXTRAS: MarketTick[] = [
  { label: "IPSA",      value: "–", change: "–",      dir: "flat" },
  { label: "Cobre",     value: "–", change: "–",      dir: "flat" },
  { label: "Desempleo", value: "8,1%", change: "+0,4pp", dir: "down" },
  { label: "PIB",       value: "2,4%", change: "+0,1pp", dir: "up"   },
];

export default function DataStrip() {
  const [tickers, setTickers] = useState<MarketTick[]>([]);

  useEffect(() => {
    fetch("/api/market", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => { if (d?.tickers?.length) setTickers(d.tickers); })
      .catch(() => {});
  }, []);

  const display = [...tickers, ...STATIC_EXTRAS].slice(0, 8);

  return (
    <div
      style={{
        background: "var(--paper-dark)",
        borderTop: "2px solid var(--ink)",
        borderBottom: "2px solid var(--ink)",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div
          className="grid grid-cols-4 lg:grid-cols-8"
          style={{ borderLeft: "1px solid var(--border)" }}
        >
          {display.map((item, i) => {
            const changeColor =
              item.dir === "up"
                ? "var(--ed-green, #0A6E4E)"
                : item.dir === "down"
                ? "var(--ed-red, #C0260F)"
                : "var(--ink-faint)";
            const arrow =
              item.dir === "up" ? "▲ " : item.dir === "down" ? "▼ " : "— ";
            const showChange = item.change && item.change !== "–";

            return (
              <div
                key={i}
                className="px-4 lg:px-5 py-3 lg:py-4 cursor-pointer transition-colors"
                style={{
                  borderRight: "1px solid var(--border)",
                  borderBottom: i >= 4 ? undefined : "1px solid transparent",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "var(--paper)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "")
                }
              >
                <div
                  className="font-mono text-[9px] uppercase tracking-[0.12em] mb-1"
                  style={{ color: "var(--ink-faint)" }}
                >
                  {item.label}
                </div>
                <div
                  className="font-mono text-base lg:text-[17px] font-medium leading-none mb-1 tabular-nums"
                  style={{ color: "var(--ink)", letterSpacing: "-0.02em" }}
                >
                  {item.value}
                </div>
                {showChange && (
                  <div
                    className="font-mono text-[10px] font-medium"
                    style={{ color: changeColor }}
                  >
                    {arrow}
                    {item.change}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
