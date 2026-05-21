import { getDynamicBrief } from "@/lib/brief/generator";
import { fetchNewsByCategory } from "@/lib/feeds";
import { getCategoryMeta } from "@/lib/categories";
import type { BriefTema } from "@/types";

const TEMA_STYLES: Record<BriefTema, { bg: string; color: string }> = {
  "Chile":          { bg: "#1E2A1A", color: "#4DB87A" },
  "Mercados":       { bg: "#1A1E2A", color: "#6B9EF5" },
  "Global":         { bg: "#1A1714", color: "#A09C95" },
  "Innovación":     { bg: "#2A1A2A", color: "#C077F5" },
  "Empresas":       { bg: "#2A1E14", color: "#F5A347" },
  "Emprendimiento": { bg: "#1A2A2A", color: "#47D4C0" },
};

function relTime(iso: string): string {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (d < 1) return "ahora";
  if (d < 60) return `hace ${d}m`;
  const h = Math.floor(d / 60);
  return h < 24 ? `hace ${h}h` : `hace ${Math.floor(h / 24)}d`;
}

export default async function Hero() {
  const [brief, { items }] = await Promise.all([
    getDynamicBrief(),
    fetchNewsByCategory("all", 20),
  ]);

  // Lead: priorizar economía/finanzas/mercados
  const econItems = items.filter(i =>
    ["economia", "finanzas", "mercados"].includes(i.categoria)
  );
  const lead = econItems[0] ?? items[0];
  const secondary = items.filter(i => i !== lead).slice(0, 2);
  const ultimas = items.slice(0, 5);

  const fechaRaw = new Date().toLocaleDateString("es-CL", {
    weekday: "long", day: "numeric", month: "short", year: "numeric",
  });
  const fechaDisplay = fechaRaw.charAt(0).toUpperCase() + fechaRaw.slice(1);

  return (
    <section style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="cc-container">
        <div className="hero-grid">

          {/* ── Brief del día (dark panel) ── */}
          <div className="hero-brief" style={{ background: "var(--dark-bg)", padding: "28px 28px 28px 0" }}>
            <div style={{ marginBottom: "10px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--amber)" }}>
                ▸ Brief del día
              </div>
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.06em", color: "#9A9690", marginBottom: "14px" }}>
              {fechaDisplay}
            </div>
            {brief.intro && (
              <p style={{ fontFamily: "var(--body)", fontSize: "13px", color: "#B0ACA5", lineHeight: 1.55, marginBottom: "18px", borderLeft: "2px solid #3A3630", paddingLeft: "10px" }}>
                {brief.intro}
              </p>
            )}
            {brief.items.slice(0, 5).map((item, i) => {
              const temaStyle = TEMA_STYLES[item.tema] ?? TEMA_STYLES["Global"];
              return (
                <div key={i} style={{ display: "flex", gap: "10px", padding: "11px 0", borderBottom: "1px solid #1E1B17" }}>
                  <div style={{ width: "4px", background: temaStyle.color, flexShrink: 0, borderRadius: "2px", alignSelf: "stretch", opacity: 0.7 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 6px", background: temaStyle.bg, color: temaStyle.color, border: `1px solid ${temaStyle.color}33` }}>
                        {item.tema}
                      </span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "#8A8680", letterSpacing: "0.06em" }}>
                        {item.fuente}
                      </span>
                    </div>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <p style={{ fontFamily: "var(--body)", fontSize: "13px", color: "#F0EDE8", lineHeight: 1.4, fontWeight: 600, marginBottom: "4px" }}>
                          {item.titulo}
                        </p>
                      </a>
                    ) : (
                      <p style={{ fontFamily: "var(--body)", fontSize: "13px", color: "#F0EDE8", lineHeight: 1.4, fontWeight: 600, marginBottom: "4px" }}>
                        {item.titulo}
                      </p>
                    )}
                    <p style={{ fontFamily: "var(--body)", fontSize: "12px", color: "#ADA9A2", lineHeight: 1.5, marginBottom: "5px" }}>
                      {item.resumen}
                    </p>
                    {item.porQueImporta && (
                      <p style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "#E8733A", lineHeight: 1.4, borderLeft: "2px solid #6A3A18", paddingLeft: "7px" }}>
                        {item.porQueImporta}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            <a
              href="/brief"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#F0EDE8", border: "1px solid #3A3630", padding: "9px 18px", marginTop: "16px" }}
            >
              Ver brief completo →
            </a>
          </div>

          <div className="cc-vdiv" />

          {/* ── Lead story (RSS en vivo) ── */}
          <div className="hero-lead" style={{ padding: "28px 28px" }}>
            {lead ? (
              <>
                <div className="cc-kicker kk-eco">
                  {getCategoryMeta(lead.categoria).label} · {lead.pais}
                </div>
                <a href={lead.link} target="_blank" rel="noopener noreferrer">
                  <h1 className="cc-h-xl">{lead.titulo}</h1>
                </a>
                {lead.resumen && <p className="cc-deck">{lead.resumen}</p>}
                <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", marginBottom: "16px" }}>
                  <span className="cc-src">{lead.fuente}</span>
                  <span className="cc-src">·</span>
                  <span className="cc-src">{relTime(lead.fecha)}</span>
                  <span className="cc-ftag cc-ftag-eco">{getCategoryMeta(lead.categoria).label}</span>
                </div>

                <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: "16px" }} />

                {secondary.length >= 2 && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr" }}>
                    {secondary.map((n, i) => (
                      <>
                        {i === 1 && <div className="cc-vdiv" key="vdiv" />}
                        <div key={n.id} style={{ padding: i === 0 ? "0 20px 0 0" : "0 0 0 20px" }}>
                          <div className="cc-kicker kk-fin" style={{ marginBottom: 4 }}>
                            {getCategoryMeta(n.categoria).label}
                          </div>
                          <a href={n.link} target="_blank" rel="noopener noreferrer">
                            <h3 className="cc-h-md">{n.titulo}</h3>
                          </a>
                          <div style={{ height: "8px" }} />
                          <span className="cc-src">{n.fuente} · {relTime(n.fecha)}</span>
                        </div>
                      </>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--ink-faint)", fontFamily: "var(--mono)", fontSize: "11px" }}>
                Cargando noticias...
              </div>
            )}
          </div>

          <div className="cc-vdiv" />

          {/* ── Últimas noticias (live) ── */}
          <div className="hero-leidas" style={{ padding: "28px 0 28px 28px" }}>
            <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "14px", paddingBottom: "10px", borderBottom: "2px solid var(--ink)" }}>
              Últimas noticias
            </div>
            {ultimas.map((n, i) => (
              <div key={n.id} style={{ display: "flex", gap: "11px", padding: "11px 0", borderBottom: i < ultimas.length - 1 ? "1px solid var(--border-light)" : "none", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "20px", fontWeight: 500, color: "var(--border)", lineHeight: 1, flexShrink: 0, paddingTop: "2px", minWidth: "28px" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <a href={n.link} target="_blank" rel="noopener noreferrer">
                    <h4 className="cc-h-sm">{n.titulo}</h4>
                  </a>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--ink-light)", marginTop: "4px" }}>
                    {relTime(n.fecha)} · {n.fuente} · {getCategoryMeta(n.categoria).label}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
