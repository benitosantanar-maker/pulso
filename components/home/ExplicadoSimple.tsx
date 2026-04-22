import Link from "next/link";
import { BookOpen, Wrench, FileText, ArrowRight } from "lucide-react";
import { recursos } from "@/lib/data/recursos";
import type { Recurso } from "@/types";

const TIPO_META: Record<
  Recurso["tipo"],
  { label: string; Icon: React.ElementType; color: string; bg: string; border: string }
> = {
  concepto: {
    label: "Concepto",
    Icon: BookOpen,
    color: "text-teal-700 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-950/40",
    border: "border-teal-100 dark:border-teal-800/50",
  },
  herramienta: {
    label: "Herramienta",
    Icon: Wrench,
    color: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-100 dark:border-amber-800/50",
  },
  lectura: {
    label: "Lectura",
    Icon: FileText,
    color: "text-blue-700 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-100 dark:border-blue-800/50",
  },
  dato: {
    label: "Dato",
    Icon: BookOpen,
    color: "text-gray-600 dark:text-gray-400",
    bg: "bg-gray-50 dark:bg-gray-800",
    border: "border-gray-100 dark:border-gray-700",
  },
};

function RecursoCard({ recurso }: { recurso: Recurso }) {
  const meta = TIPO_META[recurso.tipo];
  const { Icon } = meta;

  const href = recurso.url ?? `/recursos#${recurso.slug}`;
  const isExternal = !!recurso.url;

  const inner = (
    <div className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 hover:border-teal-200 dark:hover:border-teal-700 hover:shadow-md dark:hover:shadow-none transition-all duration-200 hover:-translate-y-0.5 h-full flex flex-col">
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-9 h-9 ${meta.bg} border ${meta.border} rounded-lg flex items-center justify-center shrink-0 transition-colors`}
        >
          <Icon className={`w-4 h-4 ${meta.color}`} />
        </div>
        <div className="min-w-0 flex-1">
          <h3
            className={`text-sm font-semibold text-gray-900 dark:text-white mb-0.5 group-hover:${meta.color} transition-colors line-clamp-1`}
          >
            {recurso.titulo}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
            {recurso.descripcion}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-3 border-t border-gray-50 dark:border-gray-700/50 flex items-center justify-between">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider ${meta.color} ${meta.bg} border ${meta.border} px-2 py-0.5 rounded-full`}
        >
          {meta.label}
        </span>
        <span className={`text-[11px] font-medium ${meta.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
          Ver {isExternal ? "recurso" : "concepto"} →
        </span>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return <Link href={href}>{inner}</Link>;
}

export default function ExplicadoSimple() {
  // Conceptos primero, luego herramientas y lecturas
  const conceptos = recursos.filter((r) => r.tipo === "concepto");
  const resto = recursos.filter((r) => r.tipo !== "concepto");
  const featured = [...conceptos, ...resto].slice(0, 6);

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                Explicado simple
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Conceptos clave
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Términos que salen en las noticias — explicados para usarlos en ramos, entrevistas y reuniones.
            </p>
          </div>
          <Link
            href="/recursos"
            className="flex items-center gap-1 text-sm text-teal-700 dark:text-teal-400 font-medium hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
          >
            Ver biblioteca completa <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid 3×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((recurso) => (
            <RecursoCard key={recurso.slug} recurso={recurso} />
          ))}
        </div>

        {/* CTA secundario */}
        <div className="mt-6 text-center">
          <Link
            href="/recursos"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
          >
            Ver todos los conceptos y herramientas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
