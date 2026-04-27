import Link from "next/link";

const GUIAS = [
  {
    num: "Guía 01",
    title: "Cómo funciona el Banco Central de Chile",
    desc: "Qué es, para qué sirve, cómo toma decisiones y por qué sus anuncios mueven la economía. Desde la TPM hasta las reservas internacionales.",
    parts: "4 partes",
    badge: "Economía",
  },
  {
    num: "Guía 02",
    title: "Cómo leer e interpretar los mercados financieros",
    desc: "Índices bursátiles, bonos, divisas y commodities. Cómo interpretar los titulares de mercado para entender qué está pasando en la economía global.",
    parts: "5 partes",
    badge: "Mercados",
  },
  {
    num: "Guía 03",
    title: "Startup 101: cómo funciona el ecosistema emprendedor",
    desc: "De la idea al exit: qué es el capital de riesgo, cómo se valorizan las startups, qué son las rondas de inversión y cómo leer un cap table.",
    parts: "6 partes",
    badge: "Emprendimiento",
  },
  {
    num: "Guía 04",
    title: "Comercio internacional y por qué los aranceles importan",
    desc: "Ventajas comparativas, cadenas de suministro globales, aranceles y TLCs. Por qué lo que decide Trump afecta el precio del pan en Chile.",
    parts: "4 partes",
    badge: "Macro",
  },
];

export default function GuiasSection() {
  return (
    <section style={{ background: "var(--paper-dark)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "36px 0" }}>
      <div className="cc-container">
        <div className="cc-section-header">
          <h2 className="cc-section-title">Guías temáticas</h2>
          <Link href="/recursos" className="cc-section-more">Ver todas las guías →</Link>
        </div>
        <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--ink-light)", marginBottom: "28px" }}>
          Series de contenido para entender temas complejos desde cero, en varias partes.
        </p>

        <div className="grid-4col" style={{ gap: 0 }}>
          {GUIAS.map((g, i) => (
            <div
              key={g.num}
              style={{ padding: "0 24px 0 0", borderRight: i < GUIAS.length - 1 ? "1px solid var(--border)" : "none", paddingLeft: i > 0 ? "24px" : undefined, cursor: "pointer", transition: "opacity 0.15s" }}
            >
              <div style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "10px" }}>
                {g.num}
              </div>
              <div style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.3 }}>
                {g.title}
              </div>
              <p style={{ fontFamily: "var(--body)", fontSize: "12.5px", color: "var(--ink-light)", lineHeight: 1.55, marginBottom: "12px" }}>
                {g.desc}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
                  {g.parts}
                </span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 7px", border: "1px solid var(--border)", color: "var(--ink-faint)" }}>
                  {g.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
