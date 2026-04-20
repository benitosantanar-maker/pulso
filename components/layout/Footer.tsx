import Link from "next/link";
import { Coffee, ExternalLink } from "lucide-react";

const LINKS_SECCIONES = [
  { href: "/categoria/economia", label: "Economía" },
  { href: "/categoria/finanzas", label: "Finanzas" },
  { href: "/categoria/marketing", label: "Marketing" },
  { href: "/categoria/innovacion", label: "Innovación" },
  { href: "/categoria/negocios", label: "Negocios" },
  { href: "/categoria/estrategia", label: "Estrategia" },
  { href: "/categoria/mercados", label: "Mercados" },
  { href: "/categoria/emprendimiento", label: "Emprendimiento" },
];

const LINKS_PROYECTO = [
  { href: "/brief", label: "Brief diario" },
  { href: "/datos-chile", label: "Datos Chile" },
  { href: "/recursos", label: "Recursos" },
  { href: "/acerca", label: "Acerca del proyecto" },
];

const FUENTES = [
  { nombre: "Diario Financiero", url: "https://www.df.cl" },
  { nombre: "Financial Times", url: "https://www.ft.com" },
  { nombre: "The Economist", url: "https://www.economist.com" },
  { nombre: "El Mercurio Economía", url: "https://www.emol.com/economia/" },
  { nombre: "La Tercera Pulso", url: "https://www.latercera.com/pulso/" },
  { nombre: "Reuters Markets", url: "https://www.reuters.com/markets/" },
  { nombre: "MIT Technology Review", url: "https://www.technologyreview.com" },
  { nombre: "Marketing Brew", url: "https://www.marketingbrew.com" },
  { nombre: "TechCrunch", url: "https://techcrunch.com" },
  { nombre: "BCCh", url: "https://www.bcentral.cl" },
  { nombre: "CMF", url: "https://www.cmfchile.cl" },
  { nombre: "INE", url: "https://www.ine.gob.cl" },
  { nombre: "FMI WEO", url: "https://www.imf.org/en/publications/weo" },
  { nombre: "OCDE", url: "https://www.oecd.org" },
  { nombre: "World Bank", url: "https://data.worldbank.org" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center">
                <Coffee className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Café <span className="text-teal-400">Comercial</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Las noticias y explicaciones que un ingeniero comercial necesita para entender el mundo de los negocios en pocos minutos.
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Para estudiantes y profesionales de Ingeniería Comercial.
            </p>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Secciones
            </h3>
            <ul className="space-y-2">
              {LINKS_SECCIONES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Proyecto */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Proyecto
            </h3>
            <ul className="space-y-2 mb-8">
              {LINKS_PROYECTO.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Fuentes curadas
            </h3>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {FUENTES.map((f) => (
                <a
                  key={f.nombre}
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-gray-500 hover:text-teal-400 transition-colors inline-flex items-center gap-0.5"
                >
                  {f.nombre}
                  <ExternalLink className="w-2 h-2 opacity-50" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div id="suscribir">
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Brief semanal
            </h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Recibe cada semana lo más importante en economía, finanzas y negocios. Sin ruido.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-teal-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-teal-600 transition-colors"
              >
                Suscribirse gratis
              </button>
            </form>
            <p className="text-xs text-gray-600 mt-2">Sin spam. Puedes darte de baja cuando quieras.</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Café Comercial · Proyecto editorial independiente
          </p>
          <p className="text-xs text-gray-700">
            Construido para reducir la carga cognitiva de ingenieros comerciales chilenos.
          </p>
        </div>
      </div>
    </footer>
  );
}
