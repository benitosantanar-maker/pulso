import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readBriefForDate, listBriefDates } from "@/lib/brief/generator";
import type { BriefTema } from "@/types";

const TEMA_STYLES: Record<BriefTema, { bg: string; border: string; color: string }> = {
  "Chile":          { bg: "var(--green-light)",   border: "var(--green)",     color: "var(--green)"   },
  "Mercados":       { bg: "var(--blue-light)",    border: "var(--blue)",      color: "var(--blue)"    },
  "Global":         { bg: "var(--paper-dark)",    border: "var(--ink-faint)", color: "var(--ink-mid)" },
  "Innovación":     { bg: "var(--purple-light)",  border: "var(--purple)",    color: "var(--purple)"  },
  "Empresas":       { bg: "var(--amber-light)",   border: "var(--amber)",     color: "var(--amber)"   },
  "Emprendimiento": { bg: "var(--teal-light)",    border: "var(--teal)",      color: "var(--teal)"    },
};

function formatDateLabel(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("es-CL", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

type Props = { params: { date: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brief = readBriefForDate(params.date);
  if (!brief) return { title: "Brief no encontrado" };
  return {
    title: `${brief.titulo} — Café Comercial`,
    description: brief.intro,
  };
}

export default function BriefArchivePage({ params }: Props) {
  // Validar formato de fecha
  if (!/^\d{4}-\d{2}-\d{2}$/.test(params.date)) notFound();

  const brief = readBriefForDate(params.date);
  if (!brief) notFound();

  const allDates = listBriefDates().filter((d) => d !== params.date);

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>

      {/* ── Hero oscuro ── */}
      <div style={{ background: "var(--dark-bg)", borderBottom: "3px solid var(--ink)" }}>
        <div className="cc-container" style={{ padding: "36px var(--px) 32px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A4740" }}>
              Inicio
            </Link>
            <span style={{ color: "#2A2620", fontFamily: "var(--mono)", fontSize: "10px" }}>›</span>
            <Link href="/brief" style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A4740" }}>
              Brief del día
            </Link>
            <span style={{ color: "#2A2620", fontFamily: "var(--mono)", fontSize: "10px" }}>›</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "capitalize", color: "var(--amber)" }}>
              {formatDateLabel(params.date)}
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
                <p style={{ fontFamily: "var(--body)", fontSize: "15px", color: "#7A7670", lineHeight: 1.65, maxWidth: "580px", borderLeft: "2px solid #2A2620", paddingLeft: "14px" }}>
                  {brief.intro}
                </p>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end", gap: "8px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "#4A4740", textAlign: "right", textTransform: "capitalize" }}>
                {formatDateLabel(params.date)}
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "#2A2620" }}>
                {brief.items.length} temas
              </div>
            </div>
          </div>

          {/* Índice */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "28px", paddingTop: "20px", borderTop: "1px solid #1E1B17" }}>
            {brief.items.map((item, i) => {
              const s = TEMA_STYLES[item.tema] ?? TEMA_STYLES["Global"];
              return (
                <a key={i} href={`#item-${i}`} style={{ fontFamily: "var(--mono)", fontSize: "8.5px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 11px", background: "#1A1714", color: s.color, border: `1px solid ${s.border}33`, textDecoration: "none" }}>
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
          <main>
            {brief.items.map((item, i) => {
              const s = TEMA_STYLES[item.tema] ?? TEMA_STYLES["Global"];
              const isLast = i === brief.items.length - 1;
              return (
                <article key={i} id={`item-${i}`} style={{ paddingBottom: "40px", marginBottom: "40px", borderBottom: isLast ? "none" : "1px solid var(--border-light)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 10px", background: s.bg, color: s.color, border: `1px solid ${s.border}55` }}>
                      {item.tema}
                    </span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-faint)" }}>
                      {item.fuente}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "baseline", marginBottom: "14px" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "22px", fontWeight: 500, color: "var(--border)", flexShrink: 0, lineHeight: 1 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(20px, 2.5vw, 27px)", fontWeight: 700, lineHeight: 1.2, color: "var(--ink)", letterSpacing: "-0.01em", margin: 0 }}>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>{item.titulo}</a>
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
            })}
          </main>

          {/* ── Sidebar ── */}
          <aside style={{ position: "sticky", top: "24px" }}>
            <div style={{ border: "1px solid var(--border-light)", marginBottom: "20px" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-light)" }}>
                <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
                  En este brief
                </div>
              </div>
              {brief.items.map((item, i) => (
                <a key={i} href={`#item-${i}`} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "10px 18px", borderBottom: i < brief.items.length - 1 ? "1px solid var(--border-light)" : "none", textDecoration: "none" }}>
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

            {/* Otros briefs */}
            {allDates.length > 0 && (
              <div style={{ border: "1px solid var(--border-light)", marginBottom: "20px" }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-light)" }}>
                  <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
                    Otros briefs
                  </div>
                </div>
                {allDates.slice(0, 7).map((date) => (
                  <Link key={date} href={`/briefs/${date}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", borderBottom: "1px solid var(--border-light)", textDecoration: "none" }}>
                    <span style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "var(--ink-mid)", textTransform: "capitalize" }}>
                      {formatDateLabel(date)}
                    </span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-faint)" }}>→</span>
                  </Link>
                ))}
                <Link href="/brief" style={{ display: "block", padding: "10px 18px", fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blue)", textDecoration: "none" }}>
                  Ver todos →
                </Link>
              </div>
            )}

            <Link href="/brief" style={{ display: "block", textAlign: "center", fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-mid)", border: "1px solid var(--border)", padding: "10px 16px" }}>
              ← Brief de hoy
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
