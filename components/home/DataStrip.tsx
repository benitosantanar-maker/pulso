import { datosChile } from "@/lib/data/datosChile";

export default function DataStrip() {
  const items = datosChile.slice(0, 8);

  return (
    <div style={{ background: "var(--paper-dark)", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)", overflow: "hidden" }}>
      <div className="cc-container" style={{ overflow: "visible", padding: 0 }}>
        <div className="data-strip-grid">
          {items.map((d) => (
            <div
              key={d.indicador}
              className="cc-data-item"
              style={{ padding: "14px 18px", borderRight: "1px solid var(--border)", cursor: "pointer", transition: "background 0.15s" }}
            >
              <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-light)", marginBottom: "4px" }}>
                {d.indicador}
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "16px", fontWeight: 500, color: "var(--ink)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "3px" }}>
                {d.valor}
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "10px", fontWeight: 500, color: d.dir === "up" ? "var(--green)" : d.dir === "down" ? "var(--red)" : "var(--ink-mid)" }}>
                {d.variacion}
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-mid)", marginTop: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {d.fuente} · {d.periodo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
