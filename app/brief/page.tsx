import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Calendar, Clock } from "lucide-react";
import { fetchDailyBrief, getLastNDays } from "@/lib/feeds";
import { getCategoryMeta } from "@/lib/categories";
import { formatBriefTitle, todayDateStr, capitalize } from "@/lib/data/brief";
import NewsletterBanner from "@/components/home/NewsletterBanner";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Brief diario — Lo que hay que saber hoy",
  description:
    "El resumen diario de economía, finanzas, negocios e innovación. Actualizado cada mañana para ingenieros comerciales y profesionales.",
};

function relTime(iso: string): string {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (d < 1) return "ahora";
  if (d < 60) return `hace ${d} min`;
  const h = Math.floor(d / 60);
  return h < 24 ? `hace ${h}h` : `hace ${Math.floor(h / 24)}d`;
}

export default async function BriefPage() {
  const today = todayDateStr();
  const brief = await fetchDailyBrief(today);
  const lastDays = getLastNDays(8).slice(1); // excluir hoy

  const hasItems = brief.items.length > 0;

  return (
    <div className="pt-16 min-h-screen bg-[#F9FAFB] dark:bg-gray-950">

      {/* ── Header editorial ─────────────────────────────────────────── */}
      <div className="bg-[#1F2937] dark:bg-gray-900 text-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-400 text-xs font-bold uppercase tracking-widest">
              Brief editorial
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-2">
            Lo que hay que saber hoy
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-xl">
            Economía, negocios, finanzas e innovación. Selección diaria de lo esencial, sin ruido.
          </p>
          <div className="flex items-center gap-3 mt-5 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {capitalize(formatBriefTitle(today))}
            </span>
            {brief.totalDisponibles > 0 && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {brief.totalDisponibles} artículos analizados
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Navegación de fechas (últimos 7 días) ─────────────────────── */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs text-gray-400 shrink-0 mr-1">Archivos:</span>
          {lastDays.map((dateStr) => {
            const d = new Date(dateStr + "T12:00:00Z");
            const label = d.toLocaleDateString("es-CL", {
              weekday: "short",
              day: "numeric",
              month: "short",
            });
            return (
              <Link
                key={dateStr}
                href={`/brief/${dateStr}`}
                className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-teal-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors whitespace-nowrap"
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Contenido del brief ────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        {!hasItems ? (
          <div className="text-center py-20 text-gray-400 dark:text-gray-600">
            <p className="text-lg font-medium mb-2">Brief en preparación</p>
            <p className="text-sm">
              Estamos recopilando las noticias del día. Vuelve en unos minutos.
            </p>
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
                  {/* Número + categoría */}
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

                  {/* Título */}
                  {isExternal ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
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

                  {/* Resumen */}
                  {item.resumen && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3 ml-13">
                      {item.resumen}
                    </p>
                  )}

                  {/* CTA */}
                  <div className="ml-13">
                    {isExternal ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
                      >
                        Ver noticia completa
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
                      >
                        Leer análisis
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            ¿Quieres recibir el brief en tu correo cada mañana?
          </p>
          <a
            href="#newsletter"
            className="inline-flex items-center gap-2 bg-[#1F2937] dark:bg-teal-700 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Suscribirse al brief diario
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <NewsletterBanner />
    </div>
  );
}
