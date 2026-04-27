import Link from "next/link";
import { getLatestBrief } from "@/lib/data/brief";
import { getNoticiasPrincipales, getNoticiasDestacadas } from "@/lib/data/noticias";
import { getCategoryMeta } from "@/lib/categories";

export default async function Hero() {
  const brief = getLatestBrief();
  const principales = getNoticiasPrincipales();
  const destacadas = getNoticiasDestacadas();

  const lead = principales[0];
  const masLeidas = [
    ...principales.slice(0, 3),
    ...destacadas.slice(0, 3),
  ].slice(0, 5);

  return (
    <section style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="cc-container">
        {/* Desktop: 3-column hero grid */}
        <div className="hero-grid">

          {/* ── Brief del día (dark panel) ── */}
          <div className="hero-brief" style={{ background: "var(--dark-bg)", padding: "28px 28px 28px 0" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "10px" }}>
              ▸ Brief del día
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.08em", color: "#4A4740", marginBottom: "16px", textTransform: "capitalize" }}>
              {new Date().toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "short", year: "numeric" })}
            </div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 700, color: "#F0EDE8", lineHeight: 1.2, marginBottom: "16px" }}>
              {brief.titulo}
            </h2>

            {brief.items.slice(0, 4).map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", padding: "10px 0", borderBottom: "1px solid #242018" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--amber)", flexShrink: 0, marginTop: "7px" }} />
                <div>
                  <span style={{ display: "inline-block", fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 6px", background: "#1E1B17", color: "var(--amber)", border: "1px solid #3A3020", marginBottom: "4px" }}>
                    {item.fuente}
                  </span>
                  <p style={{ fontFamily: "var(--body)", fontSize: "13px", color: "#F0EDE8", lineHeight: 1.45, fontWeight: 600 }}>
                    {item.titulo}
                  </p>
                  <p style={{ fontFamily: "var(--body)", fontSize: "11.5px", color: "#7A7670", lineHeight: 1.4, marginTop: "3px" }}>
                    {item.resumen}
                  </p>
                </div>
              </div>
            ))}

            <Link
              href="/brief"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#F0EDE8", border: "1px solid #3A3630", padding: "9px 18px", marginTop: "16px" }}
            >
              Ver brief completo →
            </Link>
          </div>

          <div className="cc-vdiv" />

          {/* ── Lead story ── */}
          <div className="hero-lead" style={{ padding: "28px 28px" }}>
            {lead ? (
              <>
                <div className="cc-kicker kk-eco">
                  {getCategoryMeta(lead.categoria).label} · Análisis
                </div>
                <Link href={`/noticia/${lead.slug}`}>
                  <h1 className="cc-h-xl">{lead.titulo}</h1>
                </Link>
                <p className="cc-deck">{lead.resumen}</p>
                {lead.porQueImporta && (
                  <div className="cc-por-que">
                    <strong>¿Por qué importa?</strong>
                    {lead.porQueImporta}
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", marginBottom: "16px" }}>
                  <span className="cc-src">{lead.fuente}</span>
                  <span className="cc-src">·</span>
                  <span className="cc-src">{lead.tiempoLectura} min lectura</span>
                  <span className="cc-ftag cc-ftag-eco">{getCategoryMeta(lead.categoria).label}</span>
                </div>

                <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: "16px" }} />

                {/* Two secondary stories */}
                {destacadas.length >= 2 && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr" }}>
                    {destacadas.slice(0, 2).map((n, i) => (
                      <>
                        {i === 1 && <div className="cc-vdiv" key="vdiv" />}
                        <div key={n.slug} style={{ padding: i === 0 ? "0 20px 0 0" : "0 0 0 20px" }}>
                          <div className="cc-kicker kk-fin" style={{ marginBottom: 4 }}>
                            {getCategoryMeta(n.categoria).label}
                          </div>
                          <Link href={`/noticia/${n.slug}`}>
                            <h3 className="cc-h-md">{n.titulo}</h3>
                          </Link>
                          <div style={{ height: "8px" }} />
                          <span className="cc-src">{n.fuente} · {n.tiempoLectura} min</span>
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

          {/* ── Más leídas ── */}
          <div className="hero-leidas" style={{ padding: "28px 0 28px 28px" }}>
            <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "14px", paddingBottom: "10px", borderBottom: "2px solid var(--ink)" }}>
              Más leídas 24h
            </div>
            {masLeidas.map((n, i) => (
              <div key={n.slug} style={{ display: "flex", gap: "11px", padding: "11px 0", borderBottom: i < masLeidas.length - 1 ? "1px solid var(--border-light)" : "none", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "20px", fontWeight: 500, color: "var(--border)", lineHeight: 1, flexShrink: 0, paddingTop: "2px", minWidth: "28px" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <Link href={`/noticia/${n.slug}`}>
                    <h4 className="cc-h-sm">{n.titulo}</h4>
                  </Link>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--ink-faint)", marginTop: "4px" }}>
                    {(n as any).lecturas ? `${(n as any).lecturas} lecturas · ` : ""}{getCategoryMeta(n.categoria).label}
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
