import Link from "next/link";
import FooterNewsletterForm from "@/components/layout/FooterNewsletterForm";

export default function Footer() {
  return (
    <footer style={{ background: "var(--dark-mid)", borderTop: "3px solid var(--dark-bg)", padding: "48px 0 28px" }}>
      <div className="cc-container">

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1.2fr", gap: "40px", marginBottom: "40px" }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: "var(--serif)", fontSize: "24px", fontWeight: 900, color: "#F0EDE8", marginBottom: "10px" }}>
              Café Comercial
            </div>
            <p style={{ fontFamily: "var(--body)", fontSize: "12.5px", color: "#6B6760", lineHeight: 1.6, marginBottom: "16px" }}>
              Tu plataforma de conocimiento en economía y negocios. Noticias, análisis, conceptos y guías para entender lo que pasa en el mundo — y por qué importa.
            </p>
            <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "#3A3630" }}>
              © {new Date().getFullYear()} Café Comercial
            </div>
          </div>

          {/* Conocimiento */}
          <div>
            <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B6760", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #2A2620" }}>
              Conocimiento
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "7px" }}>
              {[
                { href: "/recursos", label: "Aprende" },
                { href: "/recursos", label: "Guías temáticas" },
                { href: "/recursos", label: "Glosario" },
                { href: "/brief", label: "Brief del día" },
                { href: "/datos-chile", label: "Datos Chile" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "#8A8680", transition: "color 0.15s" }}
                    className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Secciones */}
          <div>
            <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B6760", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #2A2620" }}>
              Secciones
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "7px" }}>
              {[
                { href: "/categoria/economia", label: "Economía" },
                { href: "/categoria/finanzas", label: "Finanzas" },
                { href: "/categoria/mercados", label: "Mercados" },
                { href: "/categoria/innovacion", label: "Innovación" },
                { href: "/categoria/emprendimiento", label: "Emprendimiento" },
                { href: "/categoria/economia", label: "Análisis" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "#8A8680" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Proyecto */}
          <div>
            <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B6760", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #2A2620" }}>
              Proyecto
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "7px" }}>
              {[
                { href: "/acerca", label: "Acerca" },
                { href: "/brief", label: "Newsletter" },
                { href: "#", label: "LinkedIn" },
                { href: "#", label: "Instagram" },
                { href: "#", label: "Twitter / X" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "#8A8680" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fuentes */}
          <div>
            <div style={{ fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B6760", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #2A2620" }}>
              Fuentes curadas
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "7px" }}>
              {["Diario Financiero", "Financial Times", "The Economist", "Reuters Markets", "MIT Technology Review", "BCCh · INE · CMF · FMI"].map((f) => (
                <li key={f}>
                  <span style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "#8A8680" }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid #2A2620", paddingTop: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "#4A4740", letterSpacing: "0.04em" }}>
            Plataforma de conocimiento en economía y negocios · Proyecto editorial independiente
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {["BCCh", "INE", "CMF", "FMI", "Bolsa de Santiago", "OCDE", "World Bank"].map((src) => (
              <span key={src} style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "#3A3630" }}>
                {src}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
