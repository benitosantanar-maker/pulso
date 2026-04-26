import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { recursos } from "@/lib/data/recursos";

export default function ExplicadoSimple() {
  const featured = recursos.filter((r) => r.tipo === "concepto").slice(0, 3);

  return (
    <section className="py-12" style={{ background: "#F0EDE8", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4" style={{ color: "#B5450A" }} />
              <span className="font-sans text-[9.5px] font-bold uppercase tracking-[0.14em]" style={{ color: "#B5450A" }}>
                Aprende
              </span>
            </div>
            <h2 className="font-serif text-[22px] font-bold" style={{ color: "var(--ink)", letterSpacing: "-0.01em" }}>Conceptos clave</h2>
            <p className="font-body text-sm mt-1" style={{ color: "var(--ink-light)" }}>
              Términos que aparecen en las noticias — explicados para usarlos en ramos y entrevistas.
            </p>
          </div>
          <Link
            href="/recursos"
            className="flex items-center gap-1 text-sm text-teal-700 dark:text-teal-400 font-medium hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
          >
            Ver biblioteca <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((recurso) => (
            <Link
              key={recurso.slug}
              href={`/recursos#${recurso.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 hover:border-teal-200 dark:hover:border-teal-700 hover:shadow-md dark:hover:shadow-none transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-800/50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/40 transition-colors">
                  <BookOpen className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                    {recurso.titulo}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                    {recurso.descripcion}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 dark:border-gray-700/50 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-gray-300 dark:text-gray-600 uppercase tracking-wider">
                  {recurso.tipo}
                </span>
                <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver concepto →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
