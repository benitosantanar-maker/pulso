import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Wrench, FileText, BarChart2, ExternalLink } from "lucide-react";
import { recursos } from "@/lib/data/recursos";
import { getCategoryMeta } from "@/lib/categories";
import type { Recurso } from "@/types";

export const metadata: Metadata = {
  title: "Recursos",
  description: "Conceptos, herramientas y lecturas clave para ingenieros comerciales.",
};

const TIPO_META = {
  concepto: { label: "Concepto", icon: BookOpen, bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-100" },
  herramienta: { label: "Herramienta", icon: Wrench, bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100" },
  lectura: { label: "Lectura", icon: FileText, bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-100" },
  dato: { label: "Dato", icon: BarChart2, bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-100" },
};

function RecursoCard({ recurso }: { recurso: Recurso }) {
  const tipo = TIPO_META[recurso.tipo];
  const cat = getCategoryMeta(recurso.categoria);
  const Icon = tipo.icon;

  return (
    <div
      id={recurso.slug}
      className="bg-white rounded-xl border border-gray-100 p-5 hover:border-teal-200 hover:shadow-sm transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 ${tipo.bg} ${tipo.border} border rounded-xl flex items-center justify-center shrink-0`}>
          <Icon className={`w-4 h-4 ${tipo.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tipo.bg} ${tipo.text}`}>
              {tipo.label}
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cat.bgColor} ${cat.textColor}`}>
              {cat.label}
            </span>
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">{recurso.titulo}</h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-3">{recurso.descripcion}</p>
          {recurso.contenido && (
            <p className="text-sm text-gray-700 leading-relaxed border-t border-gray-50 pt-3">
              {recurso.contenido}
            </p>
          )}
          {recurso.url && (
            <a
              href={recurso.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-teal-700 hover:text-teal-800 transition-colors"
            >
              Visitar recurso <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RecursosPage() {
  const conceptos = recursos.filter((r) => r.tipo === "concepto");
  const herramientas = recursos.filter((r) => r.tipo === "herramienta");
  const lecturas = recursos.filter((r) => r.tipo === "lectura");

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
              Biblioteca
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recursos y conceptos clave</h1>
          <p className="text-gray-600 leading-relaxed">
            Conceptos fundamentales, herramientas útiles y fuentes de referencia para un ingeniero comercial. Todo explicado de forma directa.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Conceptos */}
        {conceptos.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-700" /> Conceptos esenciales
            </h2>
            <div className="space-y-4">
              {conceptos.map((r) => <RecursoCard key={r.slug} recurso={r} />)}
            </div>
          </section>
        )}

        {/* Herramientas */}
        {herramientas.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-blue-700" /> Herramientas y bases de datos
            </h2>
            <div className="space-y-4">
              {herramientas.map((r) => <RecursoCard key={r.slug} recurso={r} />)}
            </div>
          </section>
        )}

        {/* Lecturas */}
        {lecturas.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-700" /> Lecturas recomendadas
            </h2>
            <div className="space-y-4">
              {lecturas.map((r) => <RecursoCard key={r.slug} recurso={r} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
