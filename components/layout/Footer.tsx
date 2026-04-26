import Link from "next/link";
import FooterNewsletterForm from "@/components/layout/FooterNewsletterForm";

const LINKS_SECCIONES = [
  { href: "/categoria/economia",       label: "Economía" },
  { href: "/categoria/finanzas",       label: "Finanzas" },
  { href: "/categoria/mercados",       label: "Mercados" },
  { href: "/categoria/negocios",       label: "Negocios" },
  { href: "/categoria/innovacion",     label: "Innovación" },
  { href: "/categoria/emprendimiento", label: "Emprendimiento" },
  { href: "/categoria/marketing",      label: "Marketing" },
  { href: "/categoria/estrategia",     label: "Estrategia" },
];

const LINKS_PROYECTO = [
  { href: "/brief",        label: "Brief diario" },
  { href: "/datos-chile",  label: "Datos Chile" },
  { href: "/recursos",     label: "Aprende" },
  { href: "/acerca",       label: "Acerca" },
];

const FUENTES = [
  "Diario Financiero", "Financial Times", "The Economist",
  "El Mercurio", "La Tercera Pulso", "Reuters Markets",
  "BCCh", "CMF", "INE", "FMI", "OCDE", "World Bank",
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--dark-mid)", borderTop: "3px solid var(--dark-bg)" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-12 lg:py-14">

        {/* Grid 5 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.2fr] gap-8 lg:gap-10 mb-10">

          {/* Brand */}
          <div>
            <Link href="/">
              <div
                className="font-serif text-2xl font-black mb-2 transition-colors hover:text-white/80"
                style={{ color: "#F0EDE8" }}
              >
                Café Comercial
              </div>
            </Link>
            <p
              className="font-body text-[12.5px] leading-[1.6] mb-4"
              style={{ color: "#6B6760" }}
            >
              Portal de referencia para informarse sobre economía y negocios. Noticias, análisis, indicadores y conceptos — sin ruido, con contexto.
            </p>
            {/* Source tags */}
            <div className="flex flex-wrap gap-x-2 gap-y-1 mt-3">
              {FUENTES.map((f) => (
                <span
                  key={f}
                  className="font-mono text-[9px] tracking-[0.06em] cursor-default transition-colors"
                  style={{ color: "#3A3630" }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Secciones */}
          <div>
            <h3
              className="font-sans text-[9.5px] font-bold uppercase tracking-[0.14em] mb-3 pb-2"
              style={{ color: "#6B6760", borderBottom: "1px solid #2A2620" }}
            >
              Secciones
            </h3>
            <ul className="space-y-1.5">
              {LINKS_SECCIONES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-[12.5px] transition-colors hover:text-white"
                    style={{ color: "#8A8680" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Proyecto */}
          <div>
            <h3
              className="font-sans text-[9.5px] font-bold uppercase tracking-[0.14em] mb-3 pb-2"
              style={{ color: "#6B6760", borderBottom: "1px solid #2A2620" }}
            >
              Proyecto
            </h3>
            <ul className="space-y-1.5">
              {LINKS_PROYECTO.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-[12.5px] transition-colors hover:text-white"
                    style={{ color: "#8A8680" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Placeholder col for spacing on wide */}
          <div className="hidden lg:block" />

          {/* Newsletter */}
          <div>
            <h3
              className="font-sans text-[9.5px] font-bold uppercase tracking-[0.14em] mb-3 pb-2"
              style={{ color: "#6B6760", borderBottom: "1px solid #2A2620" }}
            >
              Brief semanal
            </h3>
            <p
              className="font-body text-[12.5px] leading-[1.55] mb-4"
              style={{ color: "#6B6760" }}
            >
              Recibe lo más importante en economía y negocios. Sin ruido.
            </p>
            <FooterNewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5"
          style={{ borderTop: "1px solid #2A2620" }}
        >
          <p className="font-mono text-[10px] tracking-[0.04em]" style={{ color: "#4A4740" }}>
            © {new Date().getFullYear()} Café Comercial · Proyecto editorial independiente
          </p>
          <p className="font-mono text-[10px] tracking-[0.04em]" style={{ color: "#3A3630" }}>
            Economía · Negocios · Mercados · Innovación
          </p>
        </div>
      </div>
    </footer>
  );
}
