/**
 * TendenciasSection — "Tendencias del día"
 * Muestra 1 artículo live por categoría activa.
 * Style: 365 scores — escaneo rápido horizontal.
 */

import { ExternalLink, TrendingUp } from "lucide-react";
import { getCategoryMeta } from "@/lib/categories";
import { fetchTendencias } from "@/lib/feeds";
import type { Category } from "@/types";

function relTime(iso: string): string {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (d < 1) return "ahora";
  if (d < 60) return `${d}m`;
  const h = Math.floor(d / 60);
  return h < 24 ? `${h}h` : `${Math.floor(h / 24)}d`;
}

const CAT_ORDER: Category[] = [
  "economia", "finanzas", "innovacion", "marketing",
  "negocios", "mercados", "emprendimiento", "estrategia",
];

export default async function TendenciasSection() {
  const { byCategory, fetchedAt, total } = await fetchTendencias();

  const entries = CAT_ORDER
    .filter((cat) => byCategory[cat])
    .map((cat) => ({ cat, item: byCategory[cat]! }));

  if (entries.length === 0) return null;

  const globalAge = relTime(fetchedAt);

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Tendencias del día
            </h2>
            <span className="text-xs text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full tabular-nums">
              {total} artículos
            </span>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Act. {globalAge}
          </span>
        </div>

        {/* Grid 4×2 — 1 card por categoría */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {entries.map(({ cat, item }) => {
            const meta = getCategoryMeta(cat);
            return (
              <a
                key={cat}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 hover:border-teal-200 dark:hover:border-teal-700 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                {/* Categoría + tiempo */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border
                      ${meta.bgColor} ${meta.textColor} ${meta.borderColor} dark:bg-opacity-20`}
                  >
                    {meta.label}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 tabular-nums">
                    {relTime(item.fecha)}
                  </span>
                </div>

                {/* Título */}
                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors flex-1">
                  {item.titulo}
                </p>

                {/* Fuente + país */}
                <div className="flex items-center gap-1 mt-auto">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">
                    {item.fuente} · {item.pais}
                  </span>
                  <ExternalLink className="w-2.5 h-2.5 text-gray-300 dark:text-gray-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
