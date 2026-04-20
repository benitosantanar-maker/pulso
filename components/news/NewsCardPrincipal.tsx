import Link from "next/link";
import { Clock, ExternalLink } from "lucide-react";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { formatDateShort } from "@/lib/utils";
import type { Noticia } from "@/types";

interface NewsCardPrincipalProps {
  noticia: Noticia;
}

export default function NewsCardPrincipal({ noticia }: NewsCardPrincipalProps) {
  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-gray-100 p-6 hover:border-teal-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-2 mb-4">
        <CategoryBadge category={noticia.categoria} />
        <span className="text-xs text-gray-400">{formatDateShort(noticia.fecha)}</span>
      </div>

      <Link href={`/noticia/${noticia.slug}`} className="flex-1 block group-hover:no-underline">
        <h2 className="text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-teal-700 transition-colors">
          {noticia.titulo}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {noticia.bajada}
        </p>
      </Link>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
          Por qué importa
        </p>
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
          {noticia.porQueImporta}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a
            href={noticia.fuenteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-teal-700 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            {noticia.fuente}
          </a>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            {noticia.tiempoLectura} min
          </span>
        </div>
        <Link
          href={`/noticia/${noticia.slug}`}
          className="text-xs font-medium text-teal-700 hover:text-teal-800 transition-colors"
        >
          Leer más →
        </Link>
      </div>
    </article>
  );
}
