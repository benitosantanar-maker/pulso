import Link from "next/link";
import {
  TrendingUp, BarChart2, Megaphone, Lightbulb,
  Briefcase, Target, Activity, Rocket,
} from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

const ICONS = {
  economia: TrendingUp,
  finanzas: BarChart2,
  marketing: Megaphone,
  innovacion: Lightbulb,
  negocios: Briefcase,
  estrategia: Target,
  mercados: Activity,
  emprendimiento: Rocket,
};

export default function CategoriasGrid() {
  return (
    <section className="py-5 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: horizontal scroll. Desktop: flex wrap */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.slug];
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
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
