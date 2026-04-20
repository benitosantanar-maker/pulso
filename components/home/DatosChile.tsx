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

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {datosChile.map((d) => {
            const isUp = d.dir === "up";
            const isDown = d.dir === "down";
            const Icon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;
            const varColor = isUp
              ? "text-emerald-600 dark:text-emerald-400"
              : isDown
              ? "text-red-500 dark:text-red-400"
              : "text-gray-400";

            return (
              <a
                key={d.indicador}
                href={d.fuenteUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={d.descripcion}
                className="group flex flex-col gap-1 bg-gray-50 dark:bg-gray-800 hover:bg-teal-50 dark:hover:bg-teal-950/30 border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-800 rounded-xl p-3 transition-all duration-200"
              >
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider truncate">
                  {d.indicador}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums leading-tight">
                  {d.valor}
                </span>
                <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${varColor}`}>
                  <Icon className="w-2.5 h-2.5" />
                  {d.variacion}
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-600 mt-0.5 flex items-center gap-1">
                  {d.fuente}
                  <ExternalLink className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" />
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
