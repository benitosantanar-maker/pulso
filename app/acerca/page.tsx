import type { Metadata } from "next";
import Link from "next/link";
import { Coffee, Target, BookOpen, Zap, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Acerca del proyecto",
  description: "Café Comercial es una plataforma editorial independiente para estudiantes y profesionales de Ingeniería Comercial.",
};

const FUENTES = [
  { nombre: "Reuters Markets", url: "https://www.reuters.com/markets/" },
  { nombre: "Diario Financiero", url: "https://www.df.cl" },
  { nombre: "IMF World Economic Outlook", url: "https://www.imf.org/en/publications/weo" },
  { nombre: "OECD SMEs and Entrepreneurship", url: "https://www.oecd.org/en/topics/smes-and-entrepreneurship.html" },
  { nombre: "MIT Technology Review", url: "https://www.technologyreview.com" },
  { nombre: "Marketing Brew", url: "https://www.marketingbrew.com" },
  { nombre: "TechCrunch", url: "https://techcrunch.com/tag/ai-startups/" },
  { nombre: "World Bank Open Data", url: "https://data.worldbank.org" },
  { nombre: "Think with Google", url: "https://business.google.com/uk/think/" },
  { nombre: "Financial Times", url: "https://www.ft.com" },
  { nombre: "Bloomberg Economics", url: "https://www.bloomberg.com" },
  { nombre: "CB Insights", url: "https://www.cbinsights.com" },
];

export default function AcercaPage() {
  return (
    <div className="pt-16 bg-white">
      {/* Header */}
      <div className="bg-[#1F2937] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-teal-700/40 rounded-xl flex items-center justify-center border border-teal-700/30">
              <Coffee className="w-5 h-5 text-teal-400" />
            </div>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-wider">
              El proyecto
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Acerca de Café Comercial</h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Una plataforma editorial independiente para estudiantes y profesionales de Ingeniería Comercial que quieren entender el mundo de los negocios sin leer medios densos.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Misión */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-teal-700" /> Misión
          </h2>
          <div className="bg-teal-50 border border-teal-100 rounded-xl p-6">
            <p className="text-gray-800 text-lg font-medium leading-relaxed italic">
              &ldquo;Las noticias y explicaciones que un ingeniero comercial necesita para entender el mundo de los negocios en pocos minutos.&rdquo;
            </p>
          </div>
          <p className="text-gray-600 leading-relaxed mt-4">
            Café Comercial nació de la frustración de leer medios financieros demasiado densos o portales de noticias generales que no explican el contexto. Queremos ser el puente: un lugar donde cada noticia viene con resumen, contexto y la pregunta que todo IC debería hacerse: <strong>¿por qué esto importa para los negocios?</strong>
          </p>
        </section>

        {/* Para quién */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-teal-700" /> Para quién es esto
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Estudiantes de Ingeniería Comercial",
              "Recién egresados buscando contexto",
              "Jóvenes profesionales en finanzas, marketing o consultoría",
              "Personas que quieren entender economía sin tecnicismos",
              "Quienes siguen noticias de negocios pero les falta contexto",
              "Emprendedores que quieren entender el macro",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                <div className="w-1.5 h-1.5 bg-teal-700 rounded-full mt-2 shrink-0" />
                <p className="text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Secciones */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-700" /> Áreas que cubrimos
          </h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors hover:opacity-80 ${cat.bgColor} ${cat.textColor} ${cat.borderColor}`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Fuentes */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Fuentes curadas</h2>
          <p className="text-gray-600 text-sm mb-5">
            Todo el contenido está basado en fuentes verificadas y reconocidas internacionalmente. Siempre citamos la fuente original.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {FUENTES.map((f) => (
              <a
                key={f.nombre}
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-100 hover:border-teal-200 transition-colors group"
              >
                <span className="text-sm text-gray-700 group-hover:text-teal-700 transition-colors">
                  {f.nombre}
                </span>
                <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-teal-700 transition-colors" />
              </a>
            ))}
          </div>
        </section>

        {/* Qué no somos */}
        <section className="bg-gray-50 rounded-xl p-6 border border-gray-100">
          <h2 className="text-base font-bold text-gray-900 mb-3">Qué no somos</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-gray-400">✗</span>
              No somos un medio de noticias de último minuto. Priorizamos contexto sobre velocidad.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">✗</span>
              No damos recomendaciones de inversión. Informamos y contextualizamos.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">✗</span>
              No tenemos sponsors ni somos afiliados a ninguna institución financiera.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">✗</span>
              No somos un blog de opinión. Partimos de datos y fuentes primarias.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
