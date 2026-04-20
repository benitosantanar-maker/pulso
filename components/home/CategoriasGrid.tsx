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
    <section className="py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
          Explorar por área
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.slug];
            return (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className={`group flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 text-center
                  ${cat.bgColor} ${cat.borderColor} hover:shadow-sm hover:scale-105`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.bgColor}`}>
                  <Icon className={`w-4 h-4 ${cat.textColor}`} />
                </div>
                <span className={`text-xs font-semibold ${cat.textColor}`}>
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
