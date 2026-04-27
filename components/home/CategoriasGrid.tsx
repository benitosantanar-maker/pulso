import Link from "next/link";

const PILARES = [
  {
    color: "var(--blue)",
    icon: "∿",
    name: "Macroeconomía",
    desc: "Inflación, tasas de interés, PIB, empleo y política fiscal. Las fuerzas que mueven la economía.",
    topics: ["Cómo funciona la inflación", "Política monetaria y TPM", "Ciclos económicos", "Comercio internacional"],
    count: "72 artículos · 18 conceptos",
    href: "/categoria/economia",
  },
  {
    color: "var(--green)",
    icon: "$",
    name: "Finanzas",
    desc: "Mercados de capitales, inversión, valorización de empresas y sistemas financieros.",
    topics: ["Cómo leer un balance", "Valorización de empresas", "Renta fija y variable", "Sistema previsional"],
    count: "38 artículos · 24 conceptos",
    href: "/categoria/finanzas",
  },
  {
    color: "var(--amber)",
    icon: "◈",
    name: "Mercados",
    desc: "Bolsas, commodities, divisas, criptomonedas. Cómo interpretar los movimientos del mercado.",
    topics: ["Cómo se mueve el dólar", "El precio del cobre", "Bolsas e índices", "Commodities en Chile"],
    count: "26 artículos · 15 conceptos",
    href: "/categoria/mercados",
  },
  {
    color: "var(--purple)",
    icon: "⬡",
    name: "Innovación",
    desc: "Tecnología, IA y transformación digital. Cómo la tecnología está cambiando la economía.",
    topics: ["IA y productividad", "Fintech en Chile", "Economía digital", "Disrupciones sectoriales"],
    count: "88 artículos · 12 conceptos",
    href: "/categoria/innovacion",
  },
  {
    color: "var(--teal)",
    icon: "△",
    name: "Emprendimiento",
    desc: "Startups, ecosistema VC, modelos de negocio y estrategia empresarial en LATAM.",
    topics: ["Cómo funciona el VC", "Unit economics", "Ecosistema LATAM", "Estrategia y growth"],
    count: "44 artículos · 20 conceptos",
    href: "/categoria/emprendimiento",
  },
];

export default function CategoriasGrid() {
  return (
    <section style={{ borderTop: "3px solid var(--ink)", borderBottom: "3px solid var(--ink)", background: "var(--dark-bg)", padding: "36px 0" }}>
      <div className="cc-container">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "28px" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 700, color: "#F0EDE8" }}>
            Explora el conocimiento por área
          </h2>
          <p style={{ fontFamily: "var(--body)", fontSize: "13px", color: "#6A6660", lineHeight: 1.5, maxWidth: "420px", textAlign: "right" }}>
            Cada pilar te lleva a noticias, análisis, conceptos y guías organizadas por tema.
          </p>
        </div>

        <div className="pilares-grid">
          {PILARES.map((p, i) => (
            <Link
              key={p.name}
              href={p.href}
              style={{ padding: "24px 22px", borderRight: i < PILARES.length - 1 ? "1px solid #2A2620" : "none", position: "relative", overflow: "hidden", display: "block" }}
              className="pilar-card"
            >
              <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: p.color }} />
              <div style={{ fontFamily: "var(--mono)", fontSize: "28px", marginBottom: "14px", lineHeight: 1, color: p.color }}>
                {p.icon}
              </div>
              <div style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 700, color: "#F0EDE8", marginBottom: "7px" }}>
                {p.name}
              </div>
              <p style={{ fontFamily: "var(--body)", fontSize: "12.5px", color: "#7A7670", lineHeight: 1.5, marginBottom: "14px" }}>
                {p.desc}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "16px" }}>
                {p.topics.map((t) => (
                  <span key={t} style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "#8A8680", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "10px", opacity: 0.5 }}>→</span>
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#3A3630", borderTop: "1px solid #2A2620", paddingTop: "12px" }}>
                {p.count}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
