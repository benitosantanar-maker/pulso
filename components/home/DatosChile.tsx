import Link from "next/link";
import { TrendingUp, TrendingDown, Minus, ArrowRight, ExternalLink } from "lucide-react";
import { datosChile } from "@/lib/data/datosChile";

export default function DatosChile() {
  return (
    <section className="py-10 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest mb-1">
              Datos oficiales
            </p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Indicadores Chile</h2>
          </div>
          <Link
            href="/datos-chile"
            className="flex items-center gap-1 text-sm text-teal-700 dark:text-teal-400 font-medium hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {datosChile.map((d) => {
            const isUp = d.dir === "up";
            const isDown = d.dir === "down";
            const Icon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;
            const varColor = isUp
              ? "text-emerald-600 dark:text-emerald-400"
              : isDown
              ? "text-red-500 dark:text-red-400"
              : "text-gray-400 dark:text-gray-500";

            return (
              <a
                key={d.indicador}
                href={d.fuenteUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={d.descripcion}
                className="group flex flex-col gap-1.5 bg-gray-50 dark:bg-gray-800 hover:bg-teal-50 dark:hover:bg-teal-950/30 border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-800 rounded-xl p-4 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {d.indicador}
                  </span>
                  <ExternalLink className="w-3 h-3 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold text-gray-900 dark:text-white tabular-nums leading-tight">
                    {d.valor}
                  </span>
                  <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${varColor}`}>
                    <Icon className="w-3 h-3" />
                    {d.variacion}
                  </span>
                </div>
                {d.microNota && (
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug mt-0.5">
                    {d.microNota}
                  </p>
                )}
                <span className="text-[10px] text-gray-300 dark:text-gray-600 mt-auto pt-1 border-t border-gray-100 dark:border-gray-700/50">
                  {d.fuente} · {d.periodo}
                </span>
              </a>
            );
          })}
        </div>

        <p className="text-[11px] text-gray-300 dark:text-gray-700 mt-3 text-right">
          Datos con fines educativos. Fuentes: BCCh · INE · CMF · Bolsa de Santiago.
        </p>
      </div>
    </section>
  );
}
