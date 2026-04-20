import Link from "next/link";
import { Coffee } from "lucide-react";

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
  { href: "/recursos", label: "Recursos" },
  { href: "/acerca", label: "Acerca del proyecto" },
];

const FUENTES = [
  "Reuters", "Diario Financiero", "FMI", "OCDE", "MIT Tech Review",
  "Marketing Brew", "TechCrunch", "World Bank",
];

export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-gray-300 mt-20">
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
            <p className="text-sm text-gray-400 leading-relaxed">
              Las noticias y explicaciones que un ingeniero comercial necesita para entender el mundo de los negocios en pocos minutos.
            </p>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
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
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Proyecto
            </h3>
            <ul className="space-y-2">
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
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 mt-8">
              Fuentes curadas
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {FUENTES.join(" · ")}
            </p>
          </div>

          {/* Newsletter */}
          <div id="suscribir">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
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
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Café Comercial. Proyecto editorial independiente.
          </p>
          <p className="text-xs text-gray-600">
            Construido para estudiantes y profesionales de Ingeniería Comercial.
          </p>
        </div>
      </div>
    </footer>
  );
}
