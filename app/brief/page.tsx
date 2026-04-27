import type { Metadata } from "next";
import Link from "next/link";
import { getDynamicBrief, listBriefDates } from "@/lib/brief/generator";
import type { BriefTema } from "@/types";

export const revalidate = 14400; // 4 horas

export const metadata: Metadata = {
  title: "Brief del día — Café Comercial",
  description: "Análisis editorial diario de las noticias económicas y de negocios más relevantes para Chile.",
};

const TEMA_STYLES: Record<BriefTema, { bg: string; border: string; color: string }> = {
  "Chile":          { bg: "var(--green-light)",   border: "var(--green)",     color: "var(--green)"   },
  "Mercados":       { bg: "var(--blue-light)",    border: "var(--blue)",      color: "var(--blue)"    },
  "Global":         { bg: "var(--paper-dark)",    border: "var(--ink-faint)", color: "var(--ink-mid)" },
  "Innovación":     { bg: "var(--purple-light)",  border: "var(--purple)",    color: "var(--purple)"  },
  "Empresas":       { bg: "var(--amber-light)",   border: "var(--amber)",     color: "var(--amber)"   },
  "Emprendimiento": { bg: "var(--teal-light)",    border: "var(--teal)",      color: "var(--teal)"    },
};

function formatDateLabel(iso: string): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("es-CL", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

export default async function BriefPage() {
  const [brief, pastDates] = await Promise.all([
    getDynamicBrief(),
    Promise.resolve(listBriefDates()),
  ]);

  const fechaDisplay = new Date().toLocaleDateString("es-CL", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  // Fechas pasadas = todas menos hoy
  const archivedDates = pastDates.filter((d) => d !== brief.fecha);

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>

      {/* ── Hero oscuro ── */}
      <div style={{ background: "var(--dark-bg)", borderBottom: "3px solid var(--ink)" }}>
        <div className="cc-container" style={{ padding: "36px var(--px) 32px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#7A7670" }}>
              Inicio
            </Link>
            <span style={{ color: "#5A5650", fontFamily: "var(--mono)", fontSize: "10px" }}>›</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--amber)" }}>
              Brief del día
            </span>
          </div>

          <div className="brief-hero-grid">
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "12px" }}>
                ▸ Brief del día
              </div>
              <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 700, color: "#F0EDE8", lineHeight: 1.1, marginBottom: "18px", letterSpacing: "-0.01em" }}>
                {brief.titulo}
              </h1>
              {brief.intro && (
                <p style={{ fontFamily: "var(--body)", fontSize: "15px", color: "#A09C95", lineHeight: 1.65, maxWidth: "580px", borderLeft: "2px solid #3A3630", paddingLeft: "14px" }}>
                  {brief.intro}
                </p>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end", gap: "8px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "#8A8680", letterSpacing: "0.06em", textAlign: "right", textTransform: "capitalize" }}>
                {fechaDisplay}
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "#6A6660" }}>
                {brief.items.length} temas
              </div>
            </div>
          </div>

          {/* Índice de temas */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "28px", paddingTop: "20px", borderTop: "1px solid #1E1B17" }}>
            {brief.items.map((item, i) => {
              const s = TEMA_STYLES[item.tema] ?? TEMA_STYLES["Global"];
              return (
                <a key={i} href={`#item-${i}`} style={{
                  fontFamily: "var(--mono)", fontSize: "8.5px", letterSpacing: "0.1em",
                  textTransform: "uppercase", padding: "4px 11px",
                  background: "#1A1714", color: s.color,
                  border: `1px solid ${s.border}33`, textDecoration: "none",
                }}>
                  {item.tema}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Cuerpo ── */}
      <div className="cc-container" style={{ padding: "44px var(--px) 60px" }}>
        <div className="brief-body-grid">

          {/* ── Artículos ── */}
          <main>
            {brief.items.length === 0 ? (
              <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--ink-faint)", padding: "60px 0", textAlign: "center" }}>
                Preparando el análisis del día...
              </div>
            ) : (
              brief.items.map((item, i) => {
                const s = TEMA_STYLES[item.tema] ?? TEMA_STYLES["Global"];
                const isLast = i === brief.items.length - 1;
                return (
                  <article
                    key={i}
                    id={`item-${i}`}
                    style={{ paddingBottom: "40px", marginBottom: "40px", borderBottom: isLast ? "none" : "1px solid var(--border-light)" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 10px", background: s.bg, color: s.color, border: `1px solid ${s.border}55` }}>
                        {item.tema}
                      </span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-faint)", letterSpacing: "0.04em" }}>
                        {item.fuente}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: "16px", alignItems: "baseline", marginBottom: "14px" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "22px", fontWeight: 500, color: "var(--border)", flexShrink: 0, lineHeight: 1 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(20px, 2.5vw, 27px)", fontWeight: 700, lineHeight: 1.2, color: "var(--ink)", letterSpacing: "-0.01em", margin: 0 }}>
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
                            {item.titulo}
                          </a>
                        ) : item.titulo}
                      </h2>
                    </div>

                    <p style={{ fontFamily: "var(--body)", fontSize: "15.5px", color: "var(--ink-mid)", lineHeight: 1.7, marginBottom: "18px", paddingLeft: "38px" }}>
                      {item.resumen}
                    </p>

                    {item.porQueImporta && !item.porQueImporta.startsWith("Noticia relevante") && (
                      <div style={{ background: "var(--amber-light)", borderLeft: "3px solid var(--amber)", padding: "13px 18px", marginBottom: "16px", marginLeft: "38px" }}>
                        <div style={{ fontFamily: "var(--mono)", fontSize: "8.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--amber)", fontWeight: 700, marginBottom: "6px" }}>
                          ¿Por qué importa?
                        </div>
                        <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.55, margin: 0 }}>
                          {item.porQueImporta}
                        </p>
                      </div>
                    )}

                    {item.link && (
                      <div style={{ paddingLeft: "38px" }}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--mono)", fontSize: "9.5px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blue)" }}>
                          Leer artículo original →
                        </a>
                      </div>
                    )}
                  </article>
                );
              })
            )}

            {/* ── Archivo de briefs anteriores ── */}
            <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "2px solid var(--ink)" }}>
              <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "20px" }}>
                Briefs anteriores
              </div>
              {archivedDates.length === 0 ? (
                <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--ink-faint)", lineHeight: 1.55 }}>
                  Los briefs del día se acumulan aquí automáticamente. Vuelve mañana para ver el historial.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {archivedDates.map((date) => (
                    <Link key={date} href={`/briefs/${date}`} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "14px 0", borderBottom: "1px solid var(--border-light)",
                      textDecoration: "none",
                    }}>
                      <span style={{ fontFamily: "var(--body)", fontSize: "15px", color: "var(--ink-mid)", textTransform: "capitalize" }}>
                        {formatDateLabel(date)}
                      </span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-faint)", letterSpacing: "0.06em" }}>
                        Ver →
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </main>

          {/* ── Sidebar ── */}
          <aside style={{ position: "sticky", top: "24px" }}>
            {/* Índice */}
            <div style={{ border: "1px solid var(--border-light)", marginBottom: "20px" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-light)" }}>
                <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
                  En este brief
                </div>
              </div>
              {brief.items.map((item, i) => (
                <a key={i} href={`#item-${i}`} style={{
                  display: "flex", gap: "10px", alignItems: "flex-start",
                  padding: "10px 18px", borderBottom: i < brief.items.length - 1 ? "1px solid var(--border-light)" : "none",
                  textDecoration: "none",
                }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--border)", flexShrink: 0, paddingTop: "2px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "var(--ink-mid)", lineHeight: 1.35, marginBottom: "3px" }}>
                      {item.titulo}
                    </div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.08em", textTransform: "uppercase", color: TEMA_STYLES[item.tema]?.color ?? "var(--ink-faint)" }}>
                      {item.tema}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Archivo de briefs */}
            <div style={{ border: "1px solid var(--border-light)", marginBottom: "20px" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-light)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
                  Archivo
                </div>
              </div>
              {archivedDates.length === 0 ? (
                <div style={{ padding: "12px 18px" }}>
                  <p style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-faint)", lineHeight: 1.5, margin: 0 }}>
                    Los briefs anteriores aparecerán aquí.
                  </p>
                </div>
              ) : (
                <>
                  {archivedDates.slice(0, 5).map((date, i) => (
                    <Link key={date} href={`/briefs/${date}`} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 18px",
                      borderBottom: i < Math.min(archivedDates.length, 5) - 1 ? "1px solid var(--border-light)" : "none",
                      textDecoration: "none",
                    }}>
                      <span style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "var(--ink-mid)", textTransform: "capitalize" }}>
                        {formatDateLabel(date)}
                      </span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-faint)" }}>→</span>
                    </Link>
                  ))}
                  {archivedDates.length > 5 && (
                    <div style={{ padding: "10px 18px", borderTop: "1px solid var(--border-light)" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-faint)", letterSpacing: "0.06em" }}>
                        + {archivedDates.length - 5} más abajo
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Newsletter CTA */}
            <div style={{ border: "1px solid var(--border-light)", padding: "18px 20px", marginBottom: "16px" }}>
              <div style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink)", marginBottom: "8px" }}>
                Recibe el brief en tu correo
              </div>
              <p style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "var(--ink-light)", lineHeight: 1.5, marginBottom: "14px" }}>
                Cada semana, el análisis que vale la pena. Sin ruido.
              </p>
              <Link href="/#newsletter" style={{
                display: "block", textAlign: "center",
                fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                background: "var(--ink)", color: "var(--paper)", padding: "11px 16px",
              }}>
                Suscribirse →
              </Link>
            </div>

            <Link href="/" style={{
              display: "block", textAlign: "center",
              fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--ink-mid)", border: "1px solid var(--border)", padding: "10px 16px",
            }}>
              ← Volver al inicio
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
