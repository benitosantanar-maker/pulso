import { Rss, Globe } from "lucide-react";
import { NewsCardRSSCompact, NewsCardRSSCard } from "@/components/news/NewsCardRSS";
import { fetchNewsByCategory } from "@/lib/feeds";
import type { FeedItem } from "@/types";

function relativeTime(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diff < 1) return "ahora";
  if (diff < 60) return `hace ${diff} min`;
  const h = Math.floor(diff / 60);
  return h < 24 ? `hace ${h}h` : `hace ${Math.floor(h / 24)}d`;
}

function FuenteTag({ item }: { item: FeedItem }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500">
      <Globe className="w-2.5 h-2.5 opacity-60" />
      {item.fuente} · {item.pais}
    </span>
  );
}

export default async function NoticiasGrid() {
  const { items: liveItems, fetchedAt, totalSources } = await fetchNewsByCategory("all", 40);
  if (liveItems.length === 0) return null;

  return (
    <section className="py-10 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
              </span>
              <Rss className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Radar en vivo
              </h2>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
              {liveItems.length} artículos · {totalSources} fuentes
            </span>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Act. {relativeTime(fetchedAt)}
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Stream en vivo de {totalSources} fuentes internacionales. Sin filtro editorial — para análisis con contexto, ver{" "}
          <span className="text-teal-700 dark:text-teal-400 font-medium">
            Lo esencial de hoy
          </span>{" "}
          ↑
        </p>

        {/* Top 8 en cards 4×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {liveItems.slice(0, 8).map((item) => (
            <div key={item.id} className="flex flex-col">
              <NewsCardRSSCard item={item} />
              <div className="mt-1 px-1">
                <FuenteTag item={item} />
              </div>
            </div>
          ))}
        </div>

        {/* Resto en lista compacta 2 columnas */}
        {liveItems.length > 8 && (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 px-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              {liveItems.slice(8).map((item) => (
                <NewsCardRSSCompact key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
