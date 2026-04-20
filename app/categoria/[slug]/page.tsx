import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, getCategoryMeta } from "@/lib/categories";
import { getNoticiasByCategoria } from "@/lib/data/noticias";
import { fetchNewsByCategory } from "@/lib/feeds";
import NewsCardLista from "@/components/news/NewsCardLista";
import NewsCardPrincipal from "@/components/news/NewsCardPrincipal";
import { NewsCardRSSCard, NewsCardRSSCompact } from "@/components/news/NewsCardRSS";
import { Rss, Globe } from "lucide-react";
import type { Category } from "@/types";

export const revalidate = 120; // revalidar cada 2 min

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = getCategoryMeta(params.slug as Category);
  return {
    title: cat.label,
    description: cat.description,
  };
}

function relativeTime(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diff < 1) return "ahora";
  if (diff < 60) return `hace ${diff} min`;
  const h = Math.floor(diff / 60);
  return h < 24 ? `hace ${h}h` : `hace ${Math.floor(h / 24)}d`;
}

export default async function CategoriaPage({ params }: Props) {
  const validSlug = CATEGORIES.find((c) => c.slug === params.slug);
  if (!validSlug) notFound();

  const cat = getCategoryMeta(params.slug as Category);

  // Noticias curadas (análisis interno)
  const curatedItems = getNoticiasByCategoria(params.slug);
  const [principal, ...rest] = curatedItems;

  // Feed dinámico de esta categoría
  const { items: liveItems, fetchedAt, totalSources } =
    await fetchNewsByCategory(params.slug as Category, 30);
  const hasLive = liveItems.length > 0;

  return (
    <div className="pt-16">
      {/* ── Category header ── */}
      <div className={`${cat.bgColor} dark:bg-gray-900 border-b ${cat.borderColor} dark:border-gray-800 py-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className={`text-xs font-semibold uppercase tracking-wider ${cat.textColor}`}>
            Sección
          </span>
          <h1 className={`text-3xl font-bold mt-1 ${cat.textColor}`}>
            {cat.label}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-xl">
            {cat.description}
          </p>
          <div className="flex items-center gap-4 mt-3">
            <p className="text-sm text-gray-400">
              {curatedItems.length} nota{curatedItems.length !== 1 && "s"} con análisis
            </p>
            {hasLive && (
              <p className="text-sm text-gray-400 flex items-center gap-1">
                <Rss className="w-3 h-3" />
                {liveItems.length} artículos en vivo · {totalSources} fuentes
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Columna principal ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Análisis curado (si existe) */}
            {curatedItems.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5">
                  Análisis y contexto
                </h2>
                <div className="space-y-5">
                  {principal && <NewsCardPrincipal noticia={principal} />}
                  {rest.map((n) => (
                    <NewsCardLista key={n.slug} noticia={n} />
                  ))}
                </div>
              </div>
            )}

            {/* Feed en vivo */}
            {hasLive && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
                    </span>
                    <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                      Feed en vivo — {cat.label}
                    </h2>
                    <span className="text-[10px] text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">
                      {liveItems.length}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    Act. {relativeTime(fetchedAt)}
                  </span>
                </div>

                {/* Top 4 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  {liveItems.slice(0, 4).map((item) => (
                    <div key={item.id}>
                      <NewsCardRSSCard item={item} />
                      <p className="text-[10px] text-gray-400 mt-1 px-1 flex items-center gap-1">
                        <Globe className="w-2.5 h-2.5 opacity-60" />
                        {item.fuente} · {item.pais}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Resto compacto */}
                {liveItems.length > 4 && (
                  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 px-4 py-2">
                    {liveItems.slice(4).map((item) => (
                      <NewsCardRSSCompact key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Estado vacío si no hay nada */}
            {curatedItems.length === 0 && !hasLive && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg font-medium mb-2">Próximamente</p>
                <p className="text-sm">Estamos cubriendo noticias de {cat.label}.</p>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Otras secciones
              </h3>
              <div className="space-y-2">
                {CATEGORIES.filter((c) => c.slug !== params.slug).map((c) => (
                  <a
                    key={c.slug}
                    href={`/categoria/${c.slug}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${c.bgColor} dark:bg-opacity-10 hover:opacity-80 transition-opacity`}
                  >
                    <span className={`text-sm font-medium ${c.textColor}`}>
                      {c.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-[#1F2937] text-white rounded-xl p-5">
              <p className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
                Brief semanal
              </p>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Recibe lo más importante cada semana en tu correo. Sin ruido.
              </p>
              <a
                href="#suscribir"
                className="block w-full text-center bg-teal-700 hover:bg-teal-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
              >
                Suscribirse
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
