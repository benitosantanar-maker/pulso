import Link from "next/link";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { formatDateShort } from "@/lib/utils";
import type { Noticia } from "@/types";

export default function NewsCardTerciaria({ noticia }: { noticia: Noticia }) {
  return (
    <article className="group flex items-start gap-3 py-3.5 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-2 px-2 rounded-lg transition-colors duration-150">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <CategoryBadge category={noticia.categoria} size="sm" />
          <span className="text-xs text-gray-400 dark:text-gray-500">{formatDateShort(noticia.fecha)}</span>
        </div>
        <Link href={`/noticia/${noticia.slug}`}>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
            {noticia.titulo}
          </h4>
        </Link>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{noticia.fuente}</p>
      </div>
    </article>
  );
}
