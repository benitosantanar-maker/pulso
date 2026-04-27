import Link from "next/link";
import { getNoticiasDestacadas } from "@/lib/data/noticias";
import { getCategoryMeta } from "@/lib/categories";

export default function AnalisisSection() {
  const destacadas = getNoticiasDestacadas();
  const lead = destacadas[0];
  const secondary = destacadas.slice(1, 5);

  return (
    <section style={{ background: "#EFECE6", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)", padding: "32px 0" }}>
      <div className="cc-container">
        <div className="cc-section-header">
          <h2 className="cc-section-title">Análisis en profundidad</h2>
          <a className="cc-section-more" href="#">Ver todo →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1px 1fr 1px 1fr" }}>

          {/* Lead */}
          <div style={{ paddingRight: "36px" }}>
            {lead ? (
              <>
                <div className="cc-kicker kk-ana">Análisis · Largo Plazo</div>
                <Link href={`/noticia/${lead.slug}`}>
                  <h2 className="cc-h-lg" style={{ fontSize: "25px", marginBottom: "12px" }}>{lead.titulo}</h2>
                </Link>
                {lead.porQueImporta && (
                  <div style={{ borderLeft: "4px solid var(--amber)", paddingLeft: "16px", margin: "14px 0" }}>
                    <p style={{ fontFamily: "var(--serif)", fontSize: "16px", fontStyle: "italic", color: "var(--ink-mid)", lineHeight: 1.5 }}>
                      &ldquo;{lead.porQueImporta}&rdquo;
                    </p>
                  </div>
                )}
                <p className="cc-deck" style={{ fontSize: "14px" }}>{lead.resumen}</p>
                <span className="cc-src">{lead.fuente} · 8 min lectura</span>
              </>
            ) : (
              <>
                <div className="cc-kicker kk-ana">Análisis · Largo Plazo</div>
                <h2 className="cc-h-lg" style={{ fontSize: "25px", marginBottom: "12px" }}>
                  ¿Está Chile perdiendo la carrera de la competitividad en América Latina?
                </h2>
                <div style={{ borderLeft: "4px solid var(--amber)", paddingLeft: "16px", margin: "14px 0" }}>
                  <p style={{ fontFamily: "var(--serif)", fontSize: "16px", fontStyle: "italic", color: "var(--ink-mid)", lineHeight: 1.5 }}>
                    "La inestabilidad regulatoria y los ciclos políticos cortos están erosionando la confianza inversora en un momento en que la región compite agresivamente por capital."
                  </p>
                </div>
                <p className="cc-deck" style={{ fontSize: "14px" }}>
                  En 10 años, Chile pasó de ser el alumno estrella de la región a enfrentar serias dudas sobre su capacidad de crecimiento sostenible.
                </p>
                <span className="cc-src">The Economist · 8 min lectura</span>
              </>
            )}
          </div>

          <div className="cc-vdiv" />

          {/* Col 2 */}
          <div style={{ padding: "0 28px" }}>
            {secondary.slice(0, 2).map((n, i) => (
              <div key={n.slug} style={{ marginBottom: i === 0 ? "24px" : 0 }}>
                <div className={`cc-kicker ${getCategoryMeta(n.categoria).textColor ? "kk-ana" : "kk-eco"}`}>
                  {getCategoryMeta(n.categoria).label}
                </div>
                <Link href={`/noticia/${n.slug}`}>
                  <h3 className="cc-h-md">{n.titulo}</h3>
                </Link>
                <p className="cc-deck-sm" style={{ marginTop: "8px", marginBottom: "12px" }}>{n.resumen}</p>
                <span className="cc-src">{n.fuente} · 5 min</span>
              </div>
            ))}
            {secondary.length < 2 && (
              <div>
                <div className="cc-kicker kk-fin">Finanzas</div>
                <h3 className="cc-h-md">La Fed en la encrucijada: inflación y desempleo suben al mismo tiempo</h3>
                <p className="cc-deck-sm" style={{ marginTop: "8px", marginBottom: "12px" }}>El escenario de estanflación parece cada vez más probable.</p>
                <span className="cc-src">Financial Times · 6 min</span>
              </div>
            )}
          </div>

          <div className="cc-vdiv" />

          {/* Col 3 */}
          <div style={{ padding: "0 28px" }}>
            {secondary.slice(2, 4).map((n, i) => (
              <div key={n.slug} style={{ marginBottom: i === 0 ? "24px" : 0 }}>
                <div className="cc-kicker kk-ana">{getCategoryMeta(n.categoria).label}</div>
                <Link href={`/noticia/${n.slug}`}>
                  <h3 className="cc-h-md">{n.titulo}</h3>
                </Link>
                <p className="cc-deck-sm" style={{ marginTop: "8px", marginBottom: "12px" }}>{n.resumen}</p>
                <span className="cc-src">{n.fuente} · 4 min</span>
              </div>
            ))}
            {secondary.length < 4 && (
              <>
                <div style={{ marginBottom: "24px" }}>
                  <div className="cc-kicker kk-eco">Macro</div>
                  <h3 className="cc-h-md">Reforma previsional: lo que realmente cambia para trabajadores y empresas</h3>
                  <p className="cc-deck-sm" style={{ marginTop: "8px", marginBottom: "12px" }}>Los efectos concretos de la cotización del 6% y el fondo de longevidad a 20 años.</p>
                  <span className="cc-src">El Mercurio Economía · 7 min</span>
                </div>
                <div>
                  <div className="cc-kicker kk-inn">IA</div>
                  <h3 className="cc-h-md">Big Tech earnings: ¿el rally bursátil tiene fundamentos reales?</h3>
                  <p className="cc-deck-sm" style={{ marginTop: "8px", marginBottom: "12px" }}>Los resultados Q1 2026 de Microsoft, Alphabet y Meta como test de fuego para el rally.</p>
                  <span className="cc-src">Seeking Alpha · 5 min</span>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
