/**
 * CategoriasGrid — barra horizontal de categorías.
 * Muestra conteo combinado: noticias curadas + artículos live del feed.
 * Es un Server Component async; el resultado viene del caché de 30 min.
 */

import Link from "next/link";
import {
  TrendingUp, BarChart2, Megaphone, Lightbulb,
  Briefcase, Target, Activity, Rocket,
} from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { noticias } from "@/lib/data/noticias";
import { fetchNewsByCategory } from "@/lib/feeds";
import type { Category } from "@/types";

const ICONS: Record<Category, React.ElementType> = {
  economia: TrendingUp,
  finanzas: BarChart2,
  marketing: Megaphone,
  innovacion: Lightbulb,
  negocios: Briefcase,
  estrategia: Target,
  mercados: Activity,
  emprendimiento: Rocket,
};

// Conteo curado (estático — no cambia entre deploys)
const CURATED: Record<string, number> = noticias.reduce(
  (acc, n) => ({ ...acc, [n.categoria]: (acc[n.categoria] ?? 0) + 1 }),
  {} as Record<string, number>
);

export default async function CategoriasGrid() {
  // Reutiliza el caché "all" — no hace fetch extra
  const { items: liveItems } = await fetchNewsByCategory("all", 200);

  // Conteo live por categoría
  const liveCounts: Record<string, number> = {};
  for (const item of liveItems) {
    liveCounts[item.categoria] = (liveCounts[item.categoria] ?? 0) + 1;
  }

  return (
    <section className="py-5 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.slug];
            const total = (CURATED[cat.slug] ?? 0) + (liveCounts[cat.slug] ?? 0);
            return (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full border shrink-0 transition-all duration-200
                  ${cat.bgColor} ${cat.borderColor} hover:shadow-sm hover:scale-105 dark:bg-opacity-10`}
              >
                <Icon className={`w-3.5 h-3.5 ${cat.textColor}`} />
                <span className={`text-sm font-semibold whitespace-nowrap ${cat.textColor}`}>
                  {cat.label}
                </span>
                {total > 0 && (
                  <span className={`text-[10px] font-bold tabular-nums ${cat.textColor} opacity-60`}>
                    {total}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
