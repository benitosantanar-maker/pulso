import Link from "next/link";
import { getDynamicBrief } from "@/lib/brief/generator";
import { getNoticiasPrincipales, getNoticiasDestacadas } from "@/lib/data/noticias";
import { getCategoryMeta } from "@/lib/categories";
import type { BriefTema } from "@/types";

// Colores por tema para las etiquetas del brief
const TEMA_STYLES: Record<BriefTema, { bg: string; color: string }> = {
  "Chile":          { bg: "#1E2A1A", color: "#4DB87A" },
  "Mercados":       { bg: "#1A1E2A", color: "#6B9EF5" },
  "Global":         { bg: "#1A1714", color: "#A09C95" },
  "Innovación":     { bg: "#2A1A2A", color: "#C077F5" },
  "Empresas":       { bg: "#2A1E14", color: "#F5A347" },
  "Emprendimiento": { bg: "#1A2A2A", color: "#47D4C0" },
};

export default async function Hero() {
  const [brief, principales, destacadas] = await Promise.all([
    getDynamicBrief(),
    Promise.resolve(getNoticiasPrincipales()),
    Promise.resolve(getNoticiasDestacadas()),
  ]);

  const lead = principales[0];
  const masLeidas = [
    ...principales.slice(0, 3),
    ...destacadas.slice(0, 3),
  ].slice(0, 5);

  const fechaDisplay = new Date().toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <section style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="cc-container">
        <div className="hero-grid">

          {/* ── Brief del día (dark panel) ── */}
          <div className="hero-brief" style={{ background: "var(--dark-bg)", padding: "28px 28px 28px 0" }}>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--amber)" }}>
                ▸ Brief del día
              </div>
              {brief.fuenteIA && (
                <div style={{ fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.1em", color: "#3A3020", textTransform: "uppercase" }}>
                  ✦ ia
                </div>
              )}
            </div>

            <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.08em", color: "#4A4740", marginBottom: "14px", textTransform: "capitalize" }}>
              {fechaDisplay}
            </div>

            {/* Intro / contexto del día */}
            {brief.intro && (
              <p style={{ fontFamily: "var(--body)", fontSize: "12.5px", color: "#8A8680", lineHeight: 1.5, marginBottom: "18px", borderLeft: "2px solid #2A2620", paddingLeft: "10px" }}>
                {brief.intro}
              </p>
            )}

            {/* Items del brief */}
            {brief.items.slice(0, 5).map((item, i) => {
              const temaStyle = TEMA_STYLES[item.tema] ?? TEMA_STYLES["Global"];
              return (
                <div key={i} style={{ display: "flex", gap: "10px", padding: "11px 0", borderBottom: "1px solid #1E1B17" }}>
                  <div style={{ width: "4px", background: temaStyle.color, flexShrink: 0, borderRadius: "2px", minHeight: "100%", alignSelf: "stretch", opacity: 0.7 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Etiqueta de tema */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                      <span style={{
                        fontFamily: "var(--mono)", fontSize: "7.5px", letterSpacing: "0.12em",
                        textTransform: "uppercase", padding: "1px 5px",
                        background: temaStyle.bg, color: temaStyle.color,
                        border: `1px solid ${temaStyle.color}22`,
                      }}>
                        {item.tema}
                      </span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "7.5px", color: "#3A3630", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {item.fuente}
                      </span>
                    </div>
                    {/* Título */}
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                        <p style={{ fontFamily: "var(--body)", fontSize: "13px", color: "#F0EDE8", lineHeight: 1.4, fontWeight: 600, marginBottom: "4px", cursor: "pointer" }}>
                          {item.titulo}
                        </p>
                      </a>
                    ) : (
                      <p style={{ fontFamily: "var(--body)", fontSize: "13px", color: "#F0EDE8", lineHeight: 1.4, fontWeight: 600, marginBottom: "4px" }}>
                        {item.titulo}
                      </p>
                    )}
                    {/* Análisis */}
                    <p style={{ fontFamily: "var(--body)", fontSize: "11.5px", color: "#6A6660", lineHeight: 1.45, marginBottom: "5px" }}>
                      {item.resumen}
                    </p>
                    {/* Por qué importa */}
                    {item.porQueImporta && (
                      <p style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "#B5450A", lineHeight: 1.4, borderLeft: "2px solid #3A2010", paddingLeft: "7px" }}>
                        {item.porQueImporta}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

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
