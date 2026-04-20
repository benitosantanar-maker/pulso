import Link from "next/link";
import { ArrowRight, Rss, Globe } from "lucide-react";
import NewsCardPrincipal from "@/components/news/NewsCardPrincipal";
import NewsCardSecundaria from "@/components/news/NewsCardSecundaria";
import { NewsCardRSSCompact, NewsCardRSSCard } from "@/components/news/NewsCardRSS";
import {
  getNoticiasPrincipales,
  getNoticiasDestacadas,
  getUltimasNoticias,
} from "@/lib/data/noticias";
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
  const principales = getNoticiasPrincipales();
  const destacadas = getNoticiasDestacadas();
  const ultimas = getUltimasNoticias(12).filter(
    (n) => !n.principal && !n.destacada
  );
  const grid4 = [...destacadas.slice(2), ...ultimas].slice(0, 4);

  // Feed dinámico: top 40 de todas las fuentes
  const { items: liveItems, fetchedAt, totalSources } = await fetchNewsByCategory("all", 40);
  const hasLive = liveItems.length > 0;

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ════════════════════════════════════════════════════════════
            NOTICIAS CURADAS (análisis completo interno)
        ════════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Lo esencial de hoy</h2>
          <Link
            href="/categoria/economia"
            className="flex items-center gap-1 text-sm text-teal-700 dark:text-teal-400 font-medium hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
          >
            Ver todo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Row 1: Principal (50%) + 2 secundarias */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {principales.length > 0 && (
            <NewsCardPrincipal noticia={principales[0]} />
          )}
          <div className="flex flex-col gap-4">
            {destacadas.slice(0, 2).map((n) => (
              <NewsCardSecundaria key={n.slug} noticia={n} />
            ))}
          </div>
        </div>

        {/* Row 2: grid 4 noticias */}
        {grid4.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {grid4.map((n) => (
              <NewsCardSecundaria key={n.slug} noticia={n} />
            ))}
          </div>
        )}

        {/* Más noticias curadas — lista compacta */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-8 mb-14">
          <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5">
            Análisis y contexto
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            {ultimas.slice(0, 8).map((n) => (
              <Link
                key={n.slug}
                href={`/noticia/${n.slug}`}
                className="group flex items-start gap-3 py-3.5 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-2 px-2 rounded-lg transition-colors duration-150"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                    {n.titulo}
                  </h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {n.fuente} · Chile
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            FEED EN VIVO (~40 fuentes)
        ════════════════════════════════════════════════════════════ */}
        {hasLive && (
          <div>
            {/* Header del feed */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
                  </span>
                  <Rss className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Feed en vivo
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
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 px-4 py-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  {liveItems.slice(8).map((item) => (
                    <NewsCardRSSCompact key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
