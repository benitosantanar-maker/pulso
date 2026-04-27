import Link from "next/link";
import { datosChile } from "@/lib/data/datosChile";

export default function DatosChile() {
  const indicators = datosChile.slice(0, 8);
  const chartHeights = [40, 48, 44, 55, 60, 57, 66, 72, 68, 79, 83, 88, 93, 96, 100];

  return (
    <section style={{ background: "var(--dark-bg)", padding: "36px 0", borderTop: "3px solid var(--ink)" }}>
      <div className="cc-container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 2fr" }}>

          {/* Left: description + mini chart */}
          <div style={{ paddingRight: "40px" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "10px" }}>
              ▸ Datos Chile
            </div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "24px", fontWeight: 700, color: "#F0EDE8", lineHeight: 1.2, marginBottom: "10px" }}>
              Indicadores oficiales de la economía chilena
            </h2>
            <p style={{ fontFamily: "var(--body)", fontSize: "13.5px", color: "#6A6660", lineHeight: 1.55 }}>
              Datos actualizados de las fuentes oficiales — BCCh, INE, CMF, FMI — con contexto para entender qué significa cada número.
            </p>

            <div style={{ marginTop: "24px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#3A3630", marginBottom: "12px" }}>
                USD/CLP · Últimos 4 meses
              </div>
              <div style={{ height: "44px", display: "flex", alignItems: "flex-end", gap: "2px" }}>
                {chartHeights.map((h, i) => (
                  <div
                    key={i}
                    style={{ flex: 1, background: i === chartHeights.length - 1 ? "#1A2A4A" : "#1E1B17", borderTop: i === chartHeights.length - 1 ? "2px solid var(--blue)" : "2px solid #3A3630", minHeight: "4px", height: `${h}%` }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: "9px", color: "#3A3630", marginTop: "4px" }}>
                <span>Ene 2026</span><span>Abr 2026</span>
              </div>
            </div>

            <div style={{ marginTop: "24px" }}>
              <Link
                href="/datos-chile"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#F0EDE8", border: "1px solid #3A3630", padding: "10px 20px", background: "none" }}
              >
                Ver dashboard completo →
              </Link>
            </div>
          </div>

          <div style={{ background: "#2A2620", width: "1px" }} />

          {/* Right: indicator grid */}
          <div style={{ paddingLeft: "40px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid #2A2620" }}>
              {indicators.map((d, i) => (
                <div
                  key={d.indicador}
                  style={{
                    padding: "16px 20px",
                    borderBottom: i < indicators.length - 2 ? "1px solid #2A2620" : "none",
                    borderRight: i % 2 === 0 ? "1px solid #2A2620" : "none",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  className="cc-ind-item"
                >
                  <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5650", marginBottom: "5px" }}>
                    {d.indicador}
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "22px", fontWeight: 500, color: "#F0EDE8", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "4px" }}>
                    {d.valor}
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 500, color: d.dir === "up" ? "#4DB87A" : d.dir === "down" ? "#F06B55" : "#5A5650" }}>
                    {d.variacion}
                  </div>
                  {d.microNota && (
                    <p style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "#5A5650", lineHeight: 1.4, marginTop: "6px" }}>
                      {d.microNota}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
