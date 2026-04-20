import Link from "next/link";
import { Clock, ExternalLink } from "lucide-react";
import CategoryBadge from "@/components/ui/CategoryBadge";
import FavoriteButton from "@/components/ui/FavoriteButton";
import { formatDateShort } from "@/lib/utils";
import type { Noticia } from "@/types";

export default function NewsCardPrincipal({ noticia }: { noticia: Noticia }) {
  return (
    <article className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-center gap-2 mb-4">
        <CategoryBadge category={noticia.categoria} />
        <span className="text-xs text-gray-400 dark:text-gray-500">{formatDateShort(noticia.fecha)}</span>
      </div>

      <Link href={`/noticia/${noticia.slug}`} className="flex-1 block">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-3 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
          {noticia.titulo}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {noticia.bajada}
        </p>
      </Link>

      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 mb-4 border border-gray-100 dark:border-gray-700/50">
        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5">
          Por qué importa
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3 italic">
          {noticia.porQueImporta}
        </p>
      </div>

      {/* Conceptos relacionados — links al glosario /recursos#slug */}
      {noticia.conceptosRelacionados && noticia.conceptosRelacionados.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mr-0.5">
            Conceptos:
          </span>
          {noticia.conceptosRelacionados.map((c) => (
            <Link
              key={c.slug}
              href={`/recursos#${c.slug}`}
              className="text-[11px] text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 hover:underline bg-teal-50 dark:bg-teal-950/30 px-2 py-0.5 rounded-full border border-teal-100 dark:border-teal-800/50 transition-colors"
            >
              {c.label}
            </Link>
          ))}
        </div>
      )}

      {/* Tags */}
      {noticia.tags && noticia.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {noticia.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded-full border border-gray-100 dark:border-gray-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a
            href={noticia.fuenteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            {noticia.fuente}
          </a>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Clock className="w-3 h-3" />
            {noticia.tiempoLectura} min
          </span>
          <FavoriteButton id={noticia.slug} />
        </div>
        <Link
          href={`/noticia/${noticia.slug}`}
          className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
        >
          Leer más →
        </Link>
      </div>
    </article>
  );
}
