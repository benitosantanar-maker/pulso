/**
 * MasLeidas — "Más leídas 24h"
 * Top 5 noticias curadas con mock views (seed determinista por slug).
 * Horizontal strip, 5 columnas en desktop.
 */

import Link from "next/link";
import { Eye } from "lucide-react";
import { noticias } from "@/lib/data/noticias";
import CategoryBadge from "@/components/ui/CategoryBadge";

/** Views deterministos — misma seed = mismo número entre deploys */
function mockViews(slug: string): number {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return 1200 + (h % 3800);
}

const TOP5 = [...noticias]
  .filter((n) => n.principal || n.destacada)
  .sort((a, b) => mockViews(b.slug) - mockViews(a.slug))
  .slice(0, 5);

export default function MasLeidas() {
  if (TOP5.length === 0) return null;

  return (
    <section className="py-6 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Más leídas 24h
          </h2>
        </div>

        {/* 5-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {TOP5.map((n, i) => (
            <Link
              key={n.slug}
              href={`/noticia/${n.slug}`}
              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              {/* Número grande */}
              <span className="text-3xl font-black text-gray-100 dark:text-gray-800 tabular-nums leading-none shrink-0 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 min-w-0">
                <div className="mb-1.5">
                  <CategoryBadge category={n.categoria} size="sm" linked={false} />
                </div>
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-snug group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors line-clamp-3">
                  {n.titulo}
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 tabular-nums">
                  {mockViews(n.slug).toLocaleString("es-CL")} lecturas
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
