/**
 * MasLeidas — "Más leídas 24h"
 * Dinámica: usa fetchMasLeidas24h() para obtener artículos reales
 * de las últimas 24–48h ordenados por relevancia.
 */

import Link from "next/link";
import { Eye, ExternalLink, TrendingUp } from "lucide-react";
import { fetchMasLeidas24h } from "@/lib/feeds";
import CategoryBadge from "@/components/ui/CategoryBadge";

function relTime(iso: string): string {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (d < 1) return "ahora";
  if (d < 60) return `${d}m`;
  const h = Math.floor(d / 60);
  return h < 24 ? `${h}h` : `${Math.floor(h / 24)}d`;
}

export default async function MasLeidas() {
  const items = await fetchMasLeidas24h(10);

  if (items.length === 0) return null;

  return (
    <section className="py-6 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Más relevantes 24h
            </h2>
            <span className="text-xs text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
              {items.length} artículos
            </span>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            Actualizado en tiempo real
          </span>
        </div>

        {/* Top 5 — cards completas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-2">
          {items.slice(0, 5).map((item, i) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <span className="text-3xl font-black text-gray-100 dark:text-gray-800 tabular-nums leading-none shrink-0 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="mb-1.5">
                  <CategoryBadge category={item.categoria} size="sm" linked={false} />
                </div>
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-snug group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors line-clamp-3">
                  {item.titulo}
                </p>
                <div className="flex items-center justify-between mt-1.5 gap-1">
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">
                    {item.fuente}
                  </p>
                  <span className="text-[10px] text-gray-300 dark:text-gray-600 tabular-nums shrink-0">
                    {relTime(item.fecha)}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 6-10 — lista compacta */}
        {items.length > 5 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {items.slice(5, 10).map((item, i) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <span className="text-xs text-gray-300 dark:text-gray-700 font-bold tabular-nums w-5 shrink-0">
                  {String(i + 6).padStart(2, "0")}
                </span>
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-snug group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors line-clamp-2 flex-1">
                  {item.titulo}
                </p>
                <ExternalLink className="w-3 h-3 text-gray-300 dark:text-gray-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
