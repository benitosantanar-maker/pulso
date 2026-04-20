import Link from "next/link";
import { Clock, ExternalLink } from "lucide-react";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { formatDate } from "@/lib/utils";
import type { Noticia } from "@/types";

interface NewsCardListaProps {
  noticia: Noticia;
}

export default function NewsCardLista({ noticia }: NewsCardListaProps) {
  return (
    <article className="group flex gap-6 bg-white rounded-xl border border-gray-100 p-5 hover:border-teal-200 hover:shadow-sm transition-all duration-200">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <CategoryBadge category={noticia.categoria} />
          <span className="text-xs text-gray-400">{formatDate(noticia.fecha)}</span>
        </div>

        <Link href={`/noticia/${noticia.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-2 group-hover:text-teal-700 transition-colors">
            {noticia.titulo}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
            {noticia.bajada}
          </p>
        </Link>

        <div className="flex items-center gap-4 mt-3">
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
            {noticia.tiempoLectura} min de lectura
          </span>
        </div>
      </div>
    </article>
  );
}
