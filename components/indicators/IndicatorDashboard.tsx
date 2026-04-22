import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getChileIndicators } from "@/lib/api/indicators";
import IndicatorCard from "@/components/indicators/IndicatorCard";

export default async function IndicatorDashboard() {
  const indicators = await getChileIndicators();

  return (
    <section className="py-10 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest mb-1">
              Datos oficiales en tiempo real
            </p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Indicadores Chile
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Qué significan para tus ramos, tu pega y tu bolsillo.
            </p>
          </div>
          <Link
            href="/datos-chile"
            className="flex items-center gap-1 text-sm text-teal-700 dark:text-teal-400 font-medium hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {indicators.map((ind) => (
            <IndicatorCard key={ind.id} indicator={ind} />
          ))}
        </div>

        <p className="text-[11px] text-gray-300 dark:text-gray-700 mt-3 text-right">
          Datos educativos. Fuentes: BCCh · INE · CMF · mindicador.cl
        </p>
      </div>
    </section>
  );
}
