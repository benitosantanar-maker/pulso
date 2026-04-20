import { ExternalLink } from "lucide-react";
import CategoryBadge from "@/components/ui/CategoryBadge";
import FavoriteButton from "@/components/ui/FavoriteButton";
import type { FeedItem } from "@/types";

function relativeTime(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diff < 1) return "ahora";
  if (diff < 60) return `hace ${diff} min`;
  const h = Math.floor(diff / 60);
  if (h < 24) return `hace ${h}h`;
  const d = Math.floor(h / 24);
  return `hace ${d}d`;
}

/** "DF / Chile" o "TechCrunch / USA" */
function SourceBadge({ fuente, pais }: { fuente: string; pais: string }) {
  return (
    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
      {fuente}
      {pais && pais !== fuente && (
        <>
          <span className="mx-0.5 opacity-40">/</span>
          <span>{pais}</span>
        </>
      )}
    </span>
  );
}

export function NewsCardRSSCompact({ item }: { item: FeedItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 py-3.5 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-2 px-2 rounded-lg transition-colors duration-150"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <CategoryBadge category={item.categoria} size="sm" />
          <SourceBadge fuente={item.fuente} pais={item.pais} />
          <span className="text-[10px] text-gray-400 dark:text-gray-500 ml-auto tabular-nums">
            {relativeTime(item.fecha)}
          </span>
        </div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
          {item.titulo}
        </h4>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {item.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] text-gray-400 dark:text-gray-500">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-0.5 ml-1 shrink-0">
        <FavoriteButton id={item.link} />
        <ExternalLink className="w-3 h-3 text-gray-300 dark:text-gray-600 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </a>
  );
}

export function NewsCardRSSCard({ item }: { item: FeedItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 hover:border-teal-200 dark:hover:border-teal-700 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* Header: categoría + tiempo */}
      <div className="flex items-center justify-between mb-3">
        <CategoryBadge category={item.categoria} />
        <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
          {relativeTime(item.fecha)}
        </span>
      </div>

      {/* Título */}
      <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors line-clamp-2 flex-1">
        {item.titulo}
      </h3>

      {/* Resumen */}
      {item.resumen && (
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-3">
          {item.resumen}
        </p>
      )}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] text-gray-400 dark:text-gray-500">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer: fuente/país + fav + icono externo */}
      <div className="flex items-center gap-1 pt-3 border-t border-gray-50 dark:border-gray-700/50 mt-auto">
        <SourceBadge fuente={item.fuente} pais={item.pais} />
        <div className="ml-auto flex items-center gap-0.5">
          <FavoriteButton id={item.link} />
          <ExternalLink className="w-3 h-3 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </a>
  );
}
