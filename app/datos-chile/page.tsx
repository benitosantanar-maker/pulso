import type { Metadata } from "next";
import { ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getChileIndicators } from "@/lib/api/indicators";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Datos Chile",
  description: "Indicadores económicos oficiales de Chile: BCCh, INE, CMF y Bolsa de Santiago.",
};

export default async function DatosChilePage() {
  const indicadores = await getChileIndicators();

  return (
    <div className="pt-16 bg-[#F9FAFB] dark:bg-gray-950 min-h-screen">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest mb-2">
            Fuentes oficiales
          </p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Indicadores económicos de Chile
          </h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            Datos en tiempo real desde mindicador.cl (BCCh, INE, CMF). Actualizados cada 5 minutos.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Fuentes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { name: "Banco Central", url: "https://www.bcentral.cl", desc: "Política monetaria, tipo de cambio" },
            { name: "INE", url: "https://www.ine.gob.cl", desc: "IPC, desempleo, actividad" },
            { name: "CMF", url: "https://www.cmfchile.cl", desc: "UF, mercado financiero" },
            { name: "mindicador.cl", url: "https://mindicador.cl", desc: "API pública de indicadores" },
          ].map((f) => (
            <a
              key={f.name}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-700 rounded-xl p-4 transition-all hover:shadow-sm"
            >
              <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors flex items-center gap-1">
                {f.name}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">{f.desc}</span>
            </a>
          ))}
        </div>

        {/* Indicadores */}
        <h2 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5">
          Indicadores actuales
        </h2>
        <div className="space-y-3">
          {indicadores.map((ind) => {
            const isUp = ind.dir === "up";
            const isDown = ind.dir === "down";
            const Icon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;
            const varColor = isUp
              ? "text-emerald-600 dark:text-emerald-400"
              : isDown
              ? "text-red-500 dark:text-red-400"
              : "text-gray-400";

            return (
              <div
                key={ind.id}
                className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-gray-900 dark:text-white">
                      {ind.name}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
                      {ind.code}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400 dark:text-gray-500">{ind.period}</span>
                    <a
                      href={ind.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-0.5"
                    >
                      {ind.source} <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  {ind.microNota && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
                      {ind.microNota}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 ml-4">
                  <span className="text-lg font-bold text-gray-900 dark:text-white tabular-nums">
                    {ind.value}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold ${varColor}`}>
                    <Icon className="w-3 h-3" /> {ind.variation}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-gray-300 dark:text-gray-700 mt-6 text-center">
          Datos con fines educativos. No usar como referencia financiera. Fuente: mindicador.cl
        </p>
      </div>
    </div>
  );
}
