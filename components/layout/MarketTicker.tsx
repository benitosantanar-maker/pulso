"use client";

import { useEffect, useState, useRef } from "react";
import type { MarketTick } from "@/types";

const STATIC: MarketTick[] = [
  { label: "TPM",        value: "5,00%",     change: "—",      dir: "flat" },
  { label: "IPC Anual",  value: "3,8%",      change: "▲+0,2pp",dir: "down" },
  { label: "USD/CLP",    value: "$950",       change: "▲+0,3%", dir: "down" },
  { label: "IPSA",       value: "7.218",      change: "▼−0,8%", dir: "down" },
  { label: "Cobre",      value: "4,78 USD",   change: "▲+1,2%", dir: "up"   },
  { label: "S&P 500",    value: "5.241",      change: "▲+0,6%", dir: "up"   },
  { label: "Oro",        value: "3.320 USD",  change: "▲+2,1%", dir: "up"   },
  { label: "BTC/USD",    value: "94.200",     change: "▲+3,4%", dir: "up"   },
];

function relativeTime(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diff < 1) return "ahora";
  if (diff < 60) return `hace ${diff}min`;
  return `hace ${Math.floor(diff / 60)}h`;
}

export default function MarketTicker() {
  const [tickers, setTickers] = useState<MarketTick[]>(STATIC);
  const [fetchedAt, setFetchedAt] = useState("");
  const [live, setLive] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  const [time, setTime] = useState("");

  async function loadData() {
    try {
      const res = await fetch("/api/market", { cache: "no-store" });
      const d = await res.json();
      if (d?.tickers?.length) {
        setTickers(d.tickers);
        setFetchedAt(d.fetchedAt);
        setLive(true);
      }
    } catch { /* silent */ }
  }

  useEffect(() => {
    loadData();
    ref.current = setInterval(loadData, 60 * 60 * 1000);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, []);

  useEffect(() => {
    function update() {
      setTime(new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }));
    }
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, []);

  const doubled = [...tickers, ...tickers];

  return (
    <div style={{ background: "var(--dark-bg)", color: "#C8C4BB", fontFamily: "var(--mono)", fontSize: "11.5px", padding: "0 var(--px)", display: "flex", alignItems: "center", height: "34px", overflow: "hidden", borderBottom: "1px solid #2A2620" }}>
      <span style={{ color: "var(--amber)", textTransform: "uppercase", fontSize: "9px", letterSpacing: "0.12em", whiteSpace: "nowrap", marginRight: "20px", fontWeight: 500 }}>
        ▸ Mercados
      </span>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <div style={{ display: "flex", whiteSpace: "nowrap", animation: "cc-ticker-scroll 50s linear infinite" }}>
          {doubled.map((t, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "6px", paddingRight: "32px" }}>
              <span style={{ color: "#9A9690", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{t.label}</span>
              <span style={{ color: "#F0EDE8", fontWeight: 500 }}>{t.value}</span>
              <span style={{ color: t.dir === "up" ? "#4DB87A" : t.dir === "down" ? "#F06B55" : "#9A9690", fontWeight: 500 }}>{t.change}</span>
              <span style={{ color: "#4A4740", marginRight: "32px" }}>|</span>
            </span>
          ))}
        </div>
      </div>
      <span style={{ whiteSpace: "nowrap", color: "#9A9690", fontSize: "10px", letterSpacing: "0.06em", marginLeft: "20px" }}>
        Santiago · {time}
        {live && fetchedAt && <> · Act. {relativeTime(fetchedAt)}</>}
      </span>
    </div>
  );
}
