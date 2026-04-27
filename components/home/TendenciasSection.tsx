import Link from "next/link";
import { fetchTendencias } from "@/lib/feeds";

function relTime(iso: string): string {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (d < 1) return "ahora";
  if (d < 60) return `${d}m`;
  const h = Math.floor(d / 60);
  return h < 24 ? `${h}h` : `${Math.floor(h / 24)}d`;
}

const PILLS = ["Brasil", "México", "Chile", "Capital de riesgo", "Ecosistema LATAM"];

const STATIC_LIST = [
  { kicker: "Liderazgo", titulo: "La regla de liderazgo que Steve Jobs le dejó a Tim Cook — y que ahora pasa al siguiente CEO", src: "Entrepreneur · 3 min" },
  { kicker: "Productividad", titulo: "Esta sencilla práctica hizo más por mi negocio que cualquier truco de productividad", src: "Entrepreneur · 3 min" },
  { kicker: "IA", titulo: "La IA te hace más productivo, pero también erosiona tu criterio", src: "Entrepreneur · 3 min" },
  { kicker: "Founders", titulo: "La nueva generación de fundadores en la era de la IA: empiezan más joven", src: "Entrepreneur · 4 min" },
  { kicker: "Networking", titulo: "Si intentas hacerlo todo solo, estás saboteando tu startup", src: "Entrepreneur · 3 min" },
  { kicker: "Decisiones", titulo: "El optimismo es tu mayor activo — hasta que juega en tu contra", src: "Entrepreneur · 3 min" },
];

export default async function TendenciasSection() {
  const { byCategory, total } = await fetchTendencias();
  const empItems = byCategory["emprendimiento"]
    ? [byCategory["emprendimiento"]]
    : [];
  const negItems = byCategory["negocios"] ? [byCategory["negocios"]] : [];
  const sideItems = [...empItems, ...negItems, ...(Object.values(byCategory).slice(0, 6))].slice(0, 6);

  return (
    <section style={{ background: "var(--paper-dark)", borderTop: "1px solid var(--border)", padding: "32px 0" }}>
      <div className="cc-container">
        <div className="cc-section-header">
          <h2 className="cc-section-title">Emprendimiento &amp; Startups</h2>
          <Link href="/categoria/emprendimiento" className="cc-section-more">Ver todo →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1px 1fr 1px 1fr" }}>

          {/* Lead */}
          <div style={{ paddingRight: "32px" }}>
            <div className="cc-kicker kk-emp">LATAM VC</div>
            <h3 className="cc-h-lg" style={{ fontSize: "21px" }}>
              En 2026 persisten retos para startups latinoamericanas a pesar del crecimiento de inversión en 2025
            </h3>
            <p className="cc-deck" style={{ fontSize: "14px", marginTop: "8px" }}>
              Brasil y México siguen liderando el ecosistema VC, absorbiendo el 80% de las rondas de inversión. Los startups del resto de la región luchan por acceder a capital en un mercado más selectivo.
            </p>
            <div style={{ height: "12px" }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {PILLS.map((p) => (
                <span key={p} style={{ display: "inline-block", fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 9px", border: "1px solid var(--border)", color: "var(--ink-light)", cursor: "pointer" }}>
                  {p}
                </span>
              ))}
            </div>
            <div style={{ height: "8px" }} />
            <span className="cc-src">Entrepreneur México · 4 min</span>
          </div>

          <div className="cc-vdiv" />

          {/* Col 2 */}
          <div style={{ padding: "0 28px" }}>
            {(sideItems.slice(0, 3).length > 0 ? sideItems.slice(0, 3) : STATIC_LIST.slice(0, 3)).map((item: any, i) => (
              <div key={i} style={{ padding: i === 0 ? "0 0 11px 0" : "11px 0", borderBottom: i < 2 ? "1px solid var(--border-light)" : "none" }}>
                <div className="cc-kicker kk-emp" style={{ marginBottom: 4 }}>
                  {item.kicker || "Emprendimiento"}
                </div>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <h4 className="cc-h-sm">{item.titulo}</h4>
                  </a>
                ) : (
                  <h4 className="cc-h-sm">{item.titulo}</h4>
                )}
                <div style={{ height: "8px" }} />
                <span className="cc-src">{item.src || item.fuente || "Entrepreneur · 3 min"}</span>
              </div>
            ))}
          </div>

          <div className="cc-vdiv" />

          {/* Col 3 */}
          <div style={{ paddingLeft: "28px" }}>
            {(sideItems.slice(3, 6).length > 0 ? sideItems.slice(3, 6) : STATIC_LIST.slice(3, 6)).map((item: any, i) => (
              <div key={i} style={{ padding: i === 0 ? "0 0 11px 0" : "11px 0", borderBottom: i < 2 ? "1px solid var(--border-light)" : "none" }}>
                <div className="cc-kicker kk-emp" style={{ marginBottom: 4 }}>
                  {item.kicker || "Emprendimiento"}
                </div>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <h4 className="cc-h-sm">{item.titulo}</h4>
                  </a>
                ) : (
                  <h4 className="cc-h-sm">{item.titulo}</h4>
                )}
                <div style={{ height: "8px" }} />
                <span className="cc-src">{item.src || item.fuente || "Entrepreneur · 3 min"}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
