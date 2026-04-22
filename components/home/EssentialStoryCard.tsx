import Link from "next/link";
import { Clock, ExternalLink } from "lucide-react";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { formatDateShort } from "@/lib/utils";
import type { Noticia } from "@/types";

interface Props {
  noticia: Noticia;
  /**
   * principal — card grande, muestra todo: bajada, "Qué pasó", "Por qué importa",
   *             impactoIC, conceptos completos.
   * secondary — card mediana, muestra título + "Por qué importa" + conceptos (3 max).
   * compact   — fila lista, solo título + fuente + tiempo de lectura.
   */
  variant?: "principal" | "secondary" | "compact";
}

export default function EssentialStoryCard({ noticia, variant = "secondary" }: Props) {
  const isPrincipal = variant === "principal";
  const isCompact = variant === "compact";

  if (isCompact) {
    return (
      <Link
        href={`/noticia/${noticia.slug}`}
        className="group flex items-start gap-3 py-3.5 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-2 px-2 rounded-lg transition-colors duration-150"
      >
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
            {noticia.titulo}
          </h4>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {noticia.fuente} · {noticia.tiempoLectura} min
          </p>
        </div>
      </Link>
    );
  }

  return (
    <article
      className={`group flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 ${
        isPrincipal ? "p-6" : "p-5"
      }`}
    >
      {/* Header: categoría + fecha + (tiempo en principal) */}
      <div className="flex items-center gap-2 mb-3">
        <CategoryBadge category={noticia.categoria} />
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {formatDateShort(noticia.fecha)}
        </span>
        {isPrincipal && (
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 ml-auto">
            <Clock className="w-3 h-3" />
            {noticia.tiempoLectura} min
          </span>
        )}
      </div>

      {/* Título + bajada (solo principal) */}
      <Link href={`/noticia/${noticia.slug}`} className="block mb-3">
        <h2
          className={`font-bold text-gray-900 dark:text-white leading-snug group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors ${
            isPrincipal ? "text-xl mb-2" : "text-base line-clamp-2"
          }`}
        >
          {noticia.titulo}
        </h2>
        {isPrincipal && (
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {noticia.bajada}
          </p>
        )}
      </Link>

      {/* Qué pasó — solo en principal */}
      {isPrincipal && noticia.resumen && (
        <div className="mb-3">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
            Qué pasó
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {noticia.resumen}
          </p>
        </div>
      )}

      {/* Por qué importa — en principal y secondary */}
      <div className="bg-teal-50 dark:bg-teal-950/30 rounded-xl p-3 border border-teal-100 dark:border-teal-800/50 mb-3">
        <p className="text-[10px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest mb-1">
          Por qué importa
        </p>
        <p
          className={`text-gray-700 dark:text-gray-300 leading-relaxed ${
            isPrincipal ? "text-sm" : "text-xs line-clamp-3"
          }`}
        >
          {noticia.porQueImporta}
        </p>
      </div>

      {/* Para el ingeniero comercial — solo en principal */}
      {isPrincipal && noticia.impactoIC && (
        <div className="mb-3">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
            Para el ingeniero comercial
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic">
            {noticia.impactoIC}
          </p>
        </div>
      )}

      {/* Conceptos relacionados */}
      {noticia.conceptosRelacionados && noticia.conceptosRelacionados.length > 0 && (
        <div className="flex flex-wrap items-center gap-1 mb-3">
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mr-0.5">
            Conceptos:
          </span>
          {noticia.conceptosRelacionados
            .slice(0, isPrincipal ? 6 : 3)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/recursos#${c.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] text-teal-700 dark:text-teal-400 hover:underline bg-teal-50 dark:bg-teal-950/30 px-2 py-0.5 rounded-full border border-teal-100 dark:border-teal-800/50 transition-colors"
              >
                {c.label}
              </Link>
            ))}
        </div>
      )}

      {/* Footer: fuente + CTA */}
      <div
        className={`flex items-center justify-between mt-auto ${
          isPrincipal
            ? "pt-4 border-t border-gray-100 dark:border-gray-700/50"
            : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <a
            href={noticia.fuenteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            {noticia.fuente}
          </a>
          {!isPrincipal && (
            <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
              <Clock className="w-3 h-3" />
              {noticia.tiempoLectura} min
            </span>
          )}
        </div>
        <Link
          href={`/noticia/${noticia.slug}`}
          className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
        >
          {isPrincipal ? "Leer análisis completo →" : "Leer →"}
        </Link>
      </div>
    </article>
  );
}
