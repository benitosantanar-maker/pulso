import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Calendar } from "lucide-react";
import { fetchDailyBrief, getLastNDays } from "@/lib/feeds";
import { getCategoryMeta } from "@/lib/categories";
import { formatBriefTitle, todayDateStr, capitalize } from "@/lib/data/brief";
import NewsletterBanner from "@/components/home/NewsletterBanner";

export const revalidate = 86400;

interface Props {
  params: { date: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = params;
  return {
    title: `Brief del ${capitalize(formatBriefTitle(date))}`,
    description: `Resumen de economía, negocios y finanzas del ${formatBriefTitle(date)}.`,
  };
}

export async function generateStaticParams() {
  return getLastNDays(7).slice(1).map((date) => ({ date }));
}

function isValidDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const d = new Date(dateStr + "T12:00:00Z");
  return !isNaN(d.getTime());
}

export default async function BriefArchivePage({ params }: Props) {
  const { date } = params;

  if (!isValidDate(date)) notFound();

  // No mostrar fechas futuras
  if (date > todayDateStr()) notFound();

  const brief = await fetchDailyBrief(date);
  const lastDays = getLastNDays(8).slice(1);

  // Calcular prev/next (solo dentro de los últimos 7 días)
  const allDays = getLastNDays(8);
  const idx = allDays.indexOf(date);
  const prevDate = idx < allDays.length - 1 ? allDays[idx + 1] : null;
  const nextDate = idx > 0 ? allDays[idx - 1] : null;
  const isToday = nextDate === todayDateStr() || idx === 0;

  return (
    <div className="pt-16 min-h-screen bg-[#F9FAFB] dark:bg-gray-950">

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className="bg-[#1F2937] dark:bg-gray-900 text-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/brief"
            className="inline-flex items-center gap-1 text-teal-400 text-xs font-semibold mb-4 hover:text-teal-300 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Brief de hoy
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-teal-400 text-xs font-bold uppercase tracking-widest">
              Archivo
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-2">
            Brief del día
          </h1>
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            {capitalize(formatBriefTitle(date))}
          </div>
        </div>
      </div>

      {/* ── Navegación días ────────────────────────────────────────────── */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <Link
            href="/brief"
            className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-teal-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors whitespace-nowrap"
          >
            Hoy
          </Link>
          {lastDays.map((d) => {
            const label = new Date(d + "T12:00:00Z").toLocaleDateString("es-CL", {
              weekday: "short",
              day: "numeric",
              month: "short",
            });
            const isActive = d === date;
            return (
              <Link
                key={d}
                href={`/brief/${d}`}
                className={`shrink-0 text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-semibold"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-teal-400 hover:text-teal-700 dark:hover:text-teal-400"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Items del brief ───────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        {brief.items.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-gray-600">
            <p className="text-lg font-medium mb-2">Brief no disponible</p>
            <p className="text-sm max-w-xs mx-auto">
              Los artículos de esta fecha ya no están disponibles en las fuentes RSS.
              El brief solo conserva los últimos 7 días.
            </p>
            <Link
              href="/brief"
              className="inline-flex items-center gap-1 mt-6 text-sm font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Ver el brief de hoy
            </Link>
          </div>
        ) : (
          <div className="space-y-0">
            {brief.items.map((item, i) => {
              const cat = getCategoryMeta(item.categoria);
              const href = item.link ?? (item.slug ? `/noticia/${item.slug}` : "#");
              const isExternal = !!item.link;

              return (
                <article
                  key={i}
                  className="group py-7 border-b border-gray-200 dark:border-gray-800 last:border-0"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl font-black text-gray-100 dark:text-gray-800 tabular-nums leading-none select-none w-10 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${cat.bgColor} ${cat.textColor} ${cat.borderColor}`}
                    >
                      {cat.label}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
                      {item.fuente}
                    </span>
                  </div>

                  {isExternal ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                        {item.titulo}
                      </h2>
                    </a>
                  ) : (
                    <Link href={href}>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                        {item.titulo}
                      </h2>
                    </Link>
                  )}

                  {item.resumen && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                      {item.resumen}
                    </p>
                  )}

                  <div>
                    {isExternal ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
                      >
                        Ver noticia <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
                      >
                        Leer análisis <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Nav anterior / siguiente */}
        <div className="flex justify-between mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
          {prevDate ? (
            <Link
              href={`/brief/${prevDate}`}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Día anterior
            </Link>
          ) : <span />}

          {nextDate ? (
            <Link
              href={isToday ? "/brief" : `/brief/${nextDate}`}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
            >
              {isToday ? "Brief de hoy" : "Día siguiente"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/brief"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
            >
              Brief de hoy <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      <NewsletterBanner />
    </div>
  );
}
