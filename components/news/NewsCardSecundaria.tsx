import Link from "next/link";
import { Clock } from "lucide-react";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { formatDateShort } from "@/lib/utils";
import type { Noticia } from "@/types";

interface NewsCardSecundariaProps {
  noticia: Noticia;
}

export default function NewsCardSecundaria({ noticia }: NewsCardSecundariaProps) {
  return (
    <article className="group flex flex-col bg-white rounded-xl border border-gray-100 p-5 hover:border-teal-200 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <CategoryBadge category={noticia.categoria} />
        <span className="text-xs text-gray-400">{formatDateShort(noticia.fecha)}</span>
      </div>

      <Link href={`/noticia/${noticia.slug}`}>
        <h3 className="text-base font-semibold text-gray-900 leading-snug mb-2 group-hover:text-teal-700 transition-colors line-clamp-2">
          {noticia.titulo}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {noticia.resumen}
        </p>
      </Link>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
        <span className="text-xs text-gray-400">{noticia.fuente}</span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="w-3 h-3" />
          {noticia.tiempoLectura} min
        </span>
      </div>
    </article>
  );
}
