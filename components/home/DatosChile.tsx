"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { datosChile } from "@/lib/data/datosChile";

export default function DatosChile() {
  return (
    <section className="py-10 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest mb-1">
              Datos oficiales
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

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {datosChile.map((d) => (
            <IndicadorCard key={d.indicador} dato={d} />
          ))}
        </div>

        <p className="text-[11px] text-gray-300 dark:text-gray-700 mt-3 text-right">
          Datos con fines educativos. Fuentes: BCCh · INE · CMF · Bolsa de Santiago.
        </p>
      </div>
    </section>
  );
}

function IndicadorCard({ dato: d }: { dato: (typeof datosChile)[number] }) {
  const [expanded, setExpanded] = useState(false);

  const isUp = d.dir === "up";
  const isDown = d.dir === "down";
  const Icon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;
  const varColor = isUp
    ? "text-emerald-600 dark:text-emerald-400"
    : isDown
    ? "text-red-500 dark:text-red-400"
    : "text-gray-400 dark:text-gray-500";

  return (
    <div className="flex flex-col bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-200 hover:border-teal-200 dark:hover:border-teal-800">

      {/* Parte superior: datos */}
      <a
        href={d.fuenteUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={d.descripcion}
        className="group flex flex-col gap-1.5 p-4 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-colors duration-200"
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

        {/* microNota — editorial breve */}
        {d.microNota && (
          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
            {d.microNota}
          </p>
        )}

        <span className="text-[10px] text-gray-300 dark:text-gray-600 mt-auto pt-1 border-t border-gray-100 dark:border-gray-700/50">
          {d.fuente} · {d.periodo}
        </span>
      </a>

      {/* Pie de tarjeta: acciones */}
      {(d.contextoParaTi || d.conceptoSlug) && (
        <div className="border-t border-gray-100 dark:border-gray-700/50 px-3 py-2 flex items-center justify-between gap-2 bg-white dark:bg-gray-900/40">

          {/* Link al glosario */}
          {d.conceptoSlug && d.conceptoLabel ? (
            <Link
              href={`/recursos#${d.conceptoSlug}`}
              className="text-[10px] text-teal-700 dark:text-teal-400 hover:underline font-medium shrink-0"
            >
              → {d.conceptoLabel}
            </Link>
          ) : (
            <span />
          )}

          {/* Toggle contexto */}
          {d.contextoParaTi && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500 hover:text-teal-700 dark:hover:text-teal-400 transition-colors font-medium"
              aria-expanded={expanded}
            >
              Qué significa
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
      )}

      {/* Panel pedagógico expandible */}
      {d.contextoParaTi && expanded && (
        <div className="px-4 py-3 bg-teal-50 dark:bg-teal-950/30 border-t border-teal-100 dark:border-teal-800/50">
          <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed">
            {d.contextoParaTi}
          </p>
        </div>
      )}
    </div>
  );
}
