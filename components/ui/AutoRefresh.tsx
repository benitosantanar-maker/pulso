"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AutoRefreshProps {
  /** Intervalo en ms entre actualizaciones (default: 5 min) */
  intervalMs?: number;
}

export default function AutoRefresh({ intervalMs = 300_000 }: AutoRefreshProps) {
  const router = useRouter();
  const [secsAgo, setSecsAgo] = useState(0);

  useEffect(() => {
    // Refresca el contenido sin recarga completa
    const refresh = setInterval(() => {
      router.refresh();
      setSecsAgo(0);
    }, intervalMs);

    // Contador de segundos desde la última actualización
    const ticker = setInterval(() => {
      setSecsAgo(s => s + 10);
    }, 10_000);

    return () => {
      clearInterval(refresh);
      clearInterval(ticker);
    };
  }, [router, intervalMs]);

  const label =
    secsAgo < 60
      ? "actualizado ahora"
      : secsAgo < 3600
      ? `actualizado hace ${Math.floor(secsAgo / 60)}m`
      : `actualizado hace ${Math.floor(secsAgo / 3600)}h`;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "var(--dark-bg)",
        color: "#9A9690",
        fontFamily: "var(--mono)",
        fontSize: "10px",
        letterSpacing: "0.06em",
        padding: "6px 12px",
        border: "1px solid #2A2620",
        display: "flex",
        alignItems: "center",
        gap: "7px",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#4DB87A",
          display: "inline-block",
          animation: "cc-pulse 2s ease-in-out infinite",
        }}
      />
      {label} · próx. {Math.round((intervalMs - secsAgo * 1000) / 60_000)}m
    </div>
  );
}
