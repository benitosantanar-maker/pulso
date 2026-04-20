import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { recursos } from "@/lib/data/recursos";

export default function ExplicadoSimple() {
  const featured = recursos.filter((r) => r.tipo === "concepto").slice(0, 3);

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-teal-700" />
              <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                Explicado simple
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Conceptos clave</h2>
          </div>
          <Link
            href="/recursos"
            className="flex items-center gap-1 text-sm text-teal-700 font-medium hover:text-teal-800 transition-colors"
          >
            Ver biblioteca <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((recurso) => (
            <Link
              key={recurso.slug}
              href={`/recursos#${recurso.slug}`}
              className="group bg-white rounded-xl border border-gray-100 p-5 hover:border-teal-200 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                    {recurso.titulo}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {recurso.descripcion}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
