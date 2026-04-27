/**
 * /brief — Brief del día completo
 * Página dedicada al análisis editorial diario generado con Claude.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { getDynamicBrief } from "@/lib/brief/generator";
import type { BriefTema } from "@/types";

export const revalidate = 10800; // 3 horas

export const metadata: Metadata = {
  title: "Brief del día — Café Comercial",
  description: "Análisis editorial diario de las noticias económicas y de negocios más relevantes para Chile, generado con IA.",
};

const TEMA_STYLES: Record<BriefTema, { bg: string; border: string; color: string }> = {
  "Chile":          { bg: "var(--green-light)",   border: "var(--green)",     color: "var(--green)"   },
  "Mercados":       { bg: "var(--blue-light)",    border: "var(--blue)",      color: "var(--blue)"    },
  "Global":         { bg: "var(--paper-dark)",    border: "var(--ink-faint)", color: "var(--ink-mid)" },
  "Innovación":     { bg: "var(--purple-light)",  border: "var(--purple)",    color: "var(--purple)"  },
  "Empresas":       { bg: "var(--amber-light)",   border: "var(--amber)",     color: "var(--amber)"   },
  "Emprendimiento": { bg: "var(--teal-light)",    border: "var(--teal)",      color: "var(--teal)"    },
};

function timeAgo(iso?: string): string {
  if (!iso) return "";
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diff < 1) return "justo ahora";
  if (diff < 60) return `hace ${diff} min`;
  const h = Math.floor(diff / 60);
  return h < 24 ? `hace ${h}h` : `hace ${Math.floor(h / 24)}d`;
}

export default async function BriefPage() {
  const brief = await getDynamicBrief();

  const fechaDisplay = new Date().toLocaleDateString("es-CL", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

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
            <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--amber)" }}>
              Brief del día
            </span>
          </div>

          <div className="brief-hero-grid">
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "12px" }}>
                ▸ Análisis editorial
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

            {/* Meta derecha */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end", gap: "8px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "#4A4740", letterSpacing: "0.06em", textAlign: "right", textTransform: "capitalize" }}>
                {fechaDisplay}
              </div>
              {brief.generadoEn && (
                <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "#3A3630" }}>
                  Actualizado {timeAgo(brief.generadoEn)}
                </div>
              )}
              {brief.fuenteIA && (
                <div style={{ fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)", border: "1px solid #3A2010", padding: "3px 9px", marginTop: "4px" }}>
                  ✦ Generado con IA
                </div>
              )}
              <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "#2A2620", marginTop: "4px" }}>
                {brief.items.length} temas analizados
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
                  transition: "background 0.15s",
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
                No se pudieron cargar los artículos. Recarga la página.
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
                    {/* Cabecera */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", flexWrap: "wrap" }}>
                      <span style={{
                        fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.12em",
                        textTransform: "uppercase", padding: "3px 10px",
                        background: s.bg, color: s.color, border: `1px solid ${s.border}55`,
                      }}>
                        {item.tema}
                      </span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-faint)", letterSpacing: "0.04em" }}>
                        {item.fuente}
                      </span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--border)" }}>·</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-faint)", textTransform: "capitalize" }}>
                        {item.categoria}
                      </span>
                    </div>

                    {/* Número + Título */}
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

                    {/* Resumen analítico */}
                    <p style={{ fontFamily: "var(--body)", fontSize: "15.5px", color: "var(--ink-mid)", lineHeight: 1.7, marginBottom: "18px", paddingLeft: "38px" }}>
                      {item.resumen}
                    </p>

                    {/* ¿Por qué importa? */}
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

                    {/* Link original */}
                    {item.link && (
                      <div style={{ paddingLeft: "38px" }}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" style={{
                          display: "inline-flex", alignItems: "center", gap: "6px",
                          fontFamily: "var(--mono)", fontSize: "9.5px", letterSpacing: "0.08em",
                          textTransform: "uppercase", color: "var(--blue)",
                        }}>
                          Leer artículo original →
                        </a>
                      </div>
                    )}
                  </article>
                );
              })
            )}
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
                  textDecoration: "none", background: "none",
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

            {/* Info generación */}
            <div style={{ background: "var(--dark-bg)", padding: "18px 20px", marginBottom: "20px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: "8.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "10px" }}>
                ▸ Cómo funciona
              </div>
              <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "#6A6660", lineHeight: 1.55, margin: "0 0 10px" }}>
                {brief.fuenteIA
                  ? "Claude analiza +45 fuentes económicas y sintetiza las noticias más relevantes para el profesional chileno."
                  : "Compilado automáticamente desde +45 fuentes económicas verificadas."}
              </p>
              {brief.generadoEn && (
                <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "#3A3630" }}>
                  Actualizado {timeAgo(brief.generadoEn)}
                </div>
              )}
            </div>

            {/* Newsletter CTA */}
            <div style={{ border: "1px solid var(--border-light)", padding: "18px 20px" }}>
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
                background: "var(--ink)", color: "var(--paper)",
                padding: "11px 16px",
              }}>
                Suscribirse →
              </Link>
            </div>

            {/* Volver */}
            <div style={{ marginTop: "16px" }}>
              <Link href="/" style={{
                display: "block", textAlign: "center",
                fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: "var(--ink-mid)", border: "1px solid var(--border)",
                padding: "10px 16px",
              }}>
                ← Volver al inicio
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
