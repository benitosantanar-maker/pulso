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
    <section className="py-10" style={{ background: "var(--paper)" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">

        {/* Editorial section header */}
        <div
          className="flex items-baseline justify-between pb-2 mb-6"
          style={{ borderBottom: "2px solid var(--ink)" }}
        >
          <h2
            className="font-serif text-[18px] font-bold"
            style={{ color: "var(--ink)", letterSpacing: "-0.01em" }}
          >
            Análisis y contexto
          </h2>
          <Link
            href="/categoria/economia"
            className="font-mono text-[10px] uppercase tracking-[0.08em] transition-colors hover:text-[#B5450A]"
            style={{ color: "#1347CC" }}
          >
            Ver todo →
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
        <div className="pt-8 mb-14" style={{ borderTop: "1px solid var(--border)" }}>
          <h3
            className="font-sans text-[9.5px] font-bold uppercase tracking-[0.16em] mb-5"
            style={{ color: "var(--ink-faint)" }}
          >
            Más análisis
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            {ultimas.slice(0, 8).map((n) => (
              <Link
                key={n.slug}
                href={`/noticia/${n.slug}`}
                className="group flex items-start gap-3 py-3.5 -mx-2 px-2 transition-colors duration-150"
                style={{ borderBottom: "1px solid var(--border-light)" }}
              >
                <div className="flex-1 min-w-0">
                  <h4
                    className="font-serif text-sm font-semibold leading-snug transition-colors line-clamp-2 group-hover:text-[#B5450A]"
                    style={{ color: "var(--ink)" }}
                  >
                    {n.titulo}
                  </h4>
                  <p className="font-mono text-[10px] mt-0.5" style={{ color: "var(--ink-faint)" }}>
                    {n.fuente} · Chile
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Feed en vivo */}
        {hasLive && (
          <div>
            <div
              className="flex items-baseline justify-between pb-2 mb-6"
              style={{ borderBottom: "2px solid var(--ink)" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ background: "#C0260F", animation: "pulse 2s infinite" }}
                  />
                  <Rss className="w-3.5 h-3.5" style={{ color: "#C0260F" }} />
                  <h2
                    className="font-serif text-[18px] font-bold"
                    style={{ color: "var(--ink)", letterSpacing: "-0.01em" }}
                  >
                    Feed en vivo
                  </h2>
                </div>
                <span
                  className="font-mono text-[9.5px] px-2 py-0.5"
                  style={{
                    color: "var(--ink-faint)",
                    background: "var(--paper-dark)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {liveItems.length} · {totalSources} fuentes
                </span>
              </div>
              <span className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>
                Act. {relativeTime(fetchedAt)}
              </span>
            </div>

            {/* Top 8 en cards 4×2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mb-8">
              {liveItems.slice(0, 8).map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col p-0"
                  style={{ borderRight: "1px solid var(--border)" }}
                >
                  <div className="px-0 pr-5">
                    <NewsCardRSSCard item={item} />
                    <div className="mt-1">
                      <FuenteTag item={item} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resto en lista compacta 2 columnas */}
            {liveItems.length > 8 && (
              <div
                className="px-4 py-2"
                style={{
                  background: "var(--paper-dark)",
                  border: "1px solid var(--border)",
                }}
              >
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
