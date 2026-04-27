import Link from "next/link";

const CONCEPTOS = [
  {
    level: "Básico",
    levelClass: "lv-basic",
    term: "Tasa de Política Monetaria (TPM)",
    def: "La tasa de interés de referencia que fija el Banco Central para influir en el costo del crédito y controlar la inflación. Cuando sube, el crédito se encarece; cuando baja, se abarata.",
  },
  {
    level: "Intermedio",
    levelClass: "lv-mid",
    term: "EBITDA",
    def: "Earnings Before Interest, Taxes, Depreciation and Amortization. Indicador de rentabilidad operativa que permite comparar empresas de distinto tamaño y estructura de deuda.",
  },
  {
    level: "Intermedio",
    levelClass: "lv-mid",
    term: "Unit Economics",
    def: "Análisis de rentabilidad por unidad individual — cliente, producto o transacción — para evaluar si un modelo de negocio es viable antes de escalar. Incluye CAC, LTV y payback period.",
  },
  {
    level: "Básico",
    levelClass: "lv-basic",
    term: "IPC — Inflación",
    def: "Índice de Precios al Consumidor. Mide el cambio promedio en los precios que pagan los hogares por una canasta representativa. La meta del BCCh es mantenerlo cerca del 3% anual.",
  },
  {
    level: "Intermedio",
    levelClass: "lv-mid",
    term: "Carry Trade",
    def: "Estrategia que consiste en endeudarse en una moneda con tasas bajas e invertir en activos de mayor rendimiento en otra moneda. Una de las principales fuerzas que mueve los tipos de cambio.",
  },
  {
    level: "Avanzado",
    levelClass: "lv-adv",
    term: "Curva de Phillips",
    def: "Relación empírica inversa entre inflación y desempleo. La coyuntura actual, con ambas subiendo simultáneamente, la pone en entredicho y recuerda la estanflación de los años 70.",
  },
];

const LEVEL_COLORS: Record<string, { bg: string; color: string }> = {
  "lv-basic": { bg: "var(--green-light)", color: "var(--green)" },
  "lv-mid":   { bg: "var(--blue-light)",  color: "var(--blue)"  },
  "lv-adv":   { bg: "var(--amber-light)", color: "var(--amber)" },
};

export default function ExplicadoSimple() {
  return (
    <section style={{ padding: "40px 0" }}>
      <div className="cc-container">
        <div className="cc-section-header">
          <h2 className="cc-section-title">Aprende · Economía y Negocios</h2>
          <Link href="/recursos" className="cc-section-more">Ver biblioteca completa →</Link>
        </div>

        {/* Concepto de la semana + intro */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 2fr", marginBottom: "32px" }}>
          <div style={{ paddingRight: "32px" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "10px" }}>
              Para entender las noticias de esta semana
            </div>
            <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.6, marginBottom: "20px" }}>
              Los conceptos más mencionados en las noticias: <strong>política monetaria</strong>, <strong>aranceles</strong> y <strong>curva de Phillips</strong>.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                "¿Qué es la guerra comercial? Explicado en 3 minutos",
                "Cómo los aranceles afectan el precio de los productos",
                "¿Qué pasa cuando la inflación y el desempleo suben juntos?",
                "El cobre y la economía chilena: la relación clave",
              ].map((t) => (
                <a key={t} href="#" style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "var(--blue)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>→</span><span>{t}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="cc-vdiv" />

          <div style={{ paddingLeft: "32px" }}>
            <div style={{ background: "var(--blue)", padding: "28px", color: "white" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "10px" }}>
                Concepto de la semana
              </div>
              <div style={{ fontFamily: "var(--serif)", fontSize: "26px", fontWeight: 700, color: "white", marginBottom: "10px", lineHeight: 1.1 }}>
                Estanflación
              </div>
              <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 1.55, marginBottom: "14px" }}>
                Ocurre cuando una economía experimenta inflación alta y crecimiento bajo (o negativo) al mismo tiempo, combinado con alto desempleo. Es el escenario más difícil para los bancos centrales.
              </p>
              <div style={{ background: "rgba(0,0,0,0.2)", padding: "12px 14px", fontFamily: "var(--sans)", fontSize: "12.5px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                <strong style={{ color: "white", display: "block", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px", opacity: 0.6 }}>
                  En contexto hoy
                </strong>
                La Fed enfrenta exactamente este dilema: si sube tasas para combatir la inflación, agrava el desempleo. No hay una solución fácil.
              </div>
            </div>
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: "28px" }} />

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: "28px" }}>
          {["Fundamentos", "Finanzas", "Mercados", "Emprendimiento", "Macro avanzado"].map((tab, i) => (
            <div
              key={tab}
              style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", padding: "9px 18px", cursor: "pointer", borderBottom: i === 0 ? "2px solid var(--blue)" : "2px solid transparent", marginBottom: "-1px", color: i === 0 ? "var(--ink)" : "var(--ink-light)" }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Concept cards — row 1 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {CONCEPTOS.slice(0, 3).map((c, i) => {
            const lv = LEVEL_COLORS[c.levelClass];
            return (
              <div key={c.term} style={{ padding: "20px 24px 20px 0", borderRight: i < 2 ? "1px solid var(--border)" : "none", paddingLeft: i > 0 ? "24px" : undefined }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "2px 7px", marginBottom: "10px", display: "inline-block", background: lv.bg, color: lv.color }}>
                  {c.level}
                </span>
                <div style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>{c.term}</div>
                <p style={{ fontFamily: "var(--body)", fontSize: "13px", color: "var(--ink-mid)", lineHeight: 1.55 }}>{c.def}</p>
                <a href="#" style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blue)", marginTop: "10px", display: "inline-block" }}>
                  Ver concepto completo →
                </a>
              </div>
            );
          })}
        </div>

        {/* Concept cards — row 2 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", marginTop: "16px" }}>
          {CONCEPTOS.slice(3, 6).map((c, i) => {
            const lv = LEVEL_COLORS[c.levelClass];
            return (
              <div key={c.term} style={{ padding: "20px 24px 20px 0", borderRight: i < 2 ? "1px solid var(--border)" : "none", paddingLeft: i > 0 ? "24px" : undefined, borderTop: "1px solid var(--border)" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "2px 7px", marginBottom: "10px", display: "inline-block", background: lv.bg, color: lv.color }}>
                  {c.level}
                </span>
                <div style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>{c.term}</div>
                <p style={{ fontFamily: "var(--body)", fontSize: "13px", color: "var(--ink-mid)", lineHeight: 1.55 }}>{c.def}</p>
                <a href="#" style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blue)", marginTop: "10px", display: "inline-block" }}>
                  Ver concepto completo →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
