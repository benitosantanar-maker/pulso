import { fetchNewsByCategory } from "@/lib/feeds";
import { getCategoryMeta } from "@/lib/categories";

function relTime(iso: string): string {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (d < 1) return "ahora";
  if (d < 60) return `hace ${d}m`;
  const h = Math.floor(d / 60);
  return h < 24 ? `hace ${h}h` : `hace ${Math.floor(h / 24)}d`;
}

export default async function AnalisisSection() {
  const { items } = await fetchNewsByCategory("all", 20);

  // Priorizar economía/finanzas/mercados/negocios para la sección de análisis
  const priority = items.filter(i =>
    ["economia", "finanzas", "mercados", "negocios"].includes(i.categoria)
  );
  const rest = items.filter(i =>
    !["economia", "finanzas", "mercados", "negocios"].includes(i.categoria)
  );
  const all = [...priority, ...rest];

  const lead = all[0];
  const secondary = all.slice(1, 5);

  if (!lead) return null;

  return (
    <section style={{ background: "#EFECE6", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)", padding: "32px 0" }}>
      <div className="cc-container">
        <div className="cc-section-header">
          <h2 className="cc-section-title">Análisis en profundidad</h2>
          <a className="cc-section-more" href="/categoria/economia">Ver todo →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1px 1fr 1px 1fr" }}>

          {/* ── Lead ── */}
          <div style={{ paddingRight: "36px" }}>
            <div className="cc-kicker kk-ana">
              {getCategoryMeta(lead.categoria).label} · {lead.pais}
            </div>
            <a href={lead.link} target="_blank" rel="noopener noreferrer">
              <h2 className="cc-h-lg" style={{ fontSize: "25px", marginBottom: "12px" }}>
                {lead.titulo}
              </h2>
            </a>
            {lead.resumen && (
              <p className="cc-deck" style={{ fontSize: "14px" }}>{lead.resumen}</p>
            )}
            <span className="cc-src">{lead.fuente} · {relTime(lead.fecha)}</span>
          </div>

          <div className="cc-vdiv" />

          {/* ── Col 2 ── */}
          <div style={{ padding: "0 28px" }}>
            {secondary.slice(0, 2).map((n, i) => (
              <div key={n.id} style={{ marginBottom: i === 0 ? "24px" : 0 }}>
                <div className="cc-kicker kk-eco">
                  {getCategoryMeta(n.categoria).label}
                </div>
                <a href={n.link} target="_blank" rel="noopener noreferrer">
                  <h3 className="cc-h-md">{n.titulo}</h3>
                </a>
                {n.resumen && (
                  <p className="cc-deck-sm" style={{ marginTop: "8px", marginBottom: "12px" }}>
                    {n.resumen}
                  </p>
                )}
                <span className="cc-src">{n.fuente} · {relTime(n.fecha)}</span>
              </div>
            ))}
          </div>

          <div className="cc-vdiv" />

          {/* ── Col 3 ── */}
          <div style={{ padding: "0 28px" }}>
            {secondary.slice(2, 4).map((n, i) => (
              <div key={n.id} style={{ marginBottom: i === 0 ? "24px" : 0 }}>
                <div className="cc-kicker kk-ana">
                  {getCategoryMeta(n.categoria).label}
                </div>
                <a href={n.link} target="_blank" rel="noopener noreferrer">
                  <h3 className="cc-h-md">{n.titulo}</h3>
                </a>
                {n.resumen && (
                  <p className="cc-deck-sm" style={{ marginTop: "8px", marginBottom: "12px" }}>
                    {n.resumen}
                  </p>
                )}
                <span className="cc-src">{n.fuente} · {relTime(n.fecha)}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
