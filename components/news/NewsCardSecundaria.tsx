import Link from "next/link";
import { Clock } from "lucide-react";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { formatDateShort } from "@/lib/utils";
import type { Noticia } from "@/types";

export default function NewsCardSecundaria({ noticia }: { noticia: Noticia }) {
  return (
    <article className="group flex flex-col bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 hover:border-teal-200 dark:hover:border-teal-700 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-center justify-between mb-3">
        <CategoryBadge category={noticia.categoria} />
        <span className="text-xs text-gray-400 dark:text-gray-500">{formatDateShort(noticia.fecha)}</span>
      </div>

      <Link href={`/noticia/${noticia.slug}`} className="flex-1">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
          {noticia.titulo}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
          {noticia.resumen}
        </p>
      </Link>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50 dark:border-gray-700/50">
        <span className="text-xs text-gray-400 dark:text-gray-500">{noticia.fuente}</span>
        <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
          <Clock className="w-3 h-3" />
          {noticia.tiempoLectura} min
        </span>
      </div>
    </article>
  );
}
