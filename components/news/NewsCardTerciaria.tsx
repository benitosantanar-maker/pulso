import Link from "next/link";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { formatDateShort } from "@/lib/utils";
import type { Noticia } from "@/types";

interface NewsCardTerciariaProps {
  noticia: Noticia;
}

export default function NewsCardTerciaria({ noticia }: NewsCardTerciariaProps) {
  return (
    <article className="group flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <CategoryBadge category={noticia.categoria} size="sm" />
          <span className="text-xs text-gray-400">{formatDateShort(noticia.fecha)}</span>
        </div>
        <Link href={`/noticia/${noticia.slug}`}>
          <h4 className="text-sm font-medium text-gray-900 leading-snug group-hover:text-teal-700 transition-colors line-clamp-2">
            {noticia.titulo}
          </h4>
        </Link>
        <p className="text-xs text-gray-400 mt-1">{noticia.fuente}</p>
      </div>
    </article>
  );
}
