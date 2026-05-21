import Link from "next/link";
import { fetchNewsByCategory } from "@/lib/feeds";
import { getCategoryMeta } from "@/lib/categories";

function relTime(iso: string): string {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (d < 1) return "ahora";
  if (d < 60) return `hace ${d}m`;
  const h = Math.floor(d / 60);
  return h < 24 ? `hace ${h}h` : `hace ${Math.floor(h / 24)}d`;
}

export default async function TendenciasSection() {
  const { items } = await fetchNewsByCategory("emprendimiento", 10);

  const lead = items[0];
  const col2 = items.slice(1, 4);
  const col3 = items.slice(4, 7);

  if (!lead) return null;

  // Tags dinámicos desde los items
  const tags = [...new Set(items.flatMap(i => i.tags ?? []))].slice(0, 5);

  return (
    <section style={{ background: "var(--paper-dark)", borderTop: "1px solid var(--border)", padding: "32px 0" }}>
      <div className="cc-container">
        <div className="cc-section-header">
          <h2 className="cc-section-title">Emprendimiento &amp; Startups</h2>
          <Link href="/categoria/emprendimiento" className="cc-section-more">Ver todo →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1px 1fr 1px 1fr" }}>

          {/* ── Lead ── */}
          <div style={{ paddingRight: "32px" }}>
            <div className="cc-kicker kk-emp">
              {getCategoryMeta(lead.categoria).label} · {lead.pais}
            </div>
            <a href={lead.link} target="_blank" rel="noopener noreferrer">
              <h3 className="cc-h-lg" style={{ fontSize: "21px" }}>{lead.titulo}</h3>
            </a>
            {lead.resumen && (
              <p className="cc-deck" style={{ fontSize: "14px", marginTop: "8px" }}>
                {lead.resumen}
              </p>
            )}
            {tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "12px" }}>
                {tags.map((t) => (
                  <span key={t} style={{ display: "inline-block", fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 9px", border: "1px solid var(--border)", color: "var(--ink-light)" }}>
                    {t}
                  </span>
                ))}
              </div>
            )}
            <div style={{ height: "8px" }} />
            <span className="cc-src">{lead.fuente} · {relTime(lead.fecha)}</span>
          </div>

          <div className="cc-vdiv" />

          {/* ── Col 2 ── */}
          <div style={{ padding: "0 28px" }}>
            {col2.map((item, i) => (
              <div key={item.id} style={{ padding: i === 0 ? "0 0 11px 0" : "11px 0", borderBottom: i < col2.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                <div className="cc-kicker kk-emp" style={{ marginBottom: 4 }}>
                  {getCategoryMeta(item.categoria).label}
                </div>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <h4 className="cc-h-sm">{item.titulo}</h4>
                </a>
                <div style={{ height: "8px" }} />
                <span className="cc-src">{item.fuente} · {relTime(item.fecha)}</span>
              </div>
            ))}
          </div>

          <div className="cc-vdiv" />

          {/* ── Col 3 ── */}
          <div style={{ paddingLeft: "28px" }}>
            {col3.map((item, i) => (
              <div key={item.id} style={{ padding: i === 0 ? "0 0 11px 0" : "11px 0", borderBottom: i < col3.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                <div className="cc-kicker kk-emp" style={{ marginBottom: 4 }}>
                  {getCategoryMeta(item.categoria).label}
                </div>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <h4 className="cc-h-sm">{item.titulo}</h4>
                </a>
                <div style={{ height: "8px" }} />
                <span className="cc-src">{item.fuente} · {relTime(item.fecha)}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
