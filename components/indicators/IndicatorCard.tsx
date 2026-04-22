"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  ChevronDown,
  GraduationCap,
  Briefcase,
  Globe,
} from "lucide-react";
import type { ChileIndicator } from "@/types";

const PERSONA_TABS = [
  { key: "student" as const, label: "Ramos", Icon: GraduationCap, color: "text-blue-700 dark:text-blue-400" },
  { key: "worker" as const, label: "Pega", Icon: Briefcase, color: "text-amber-700 dark:text-amber-400" },
  { key: "citizen" as const, label: "Bolsillo", Icon: Globe, color: "text-teal-700 dark:text-teal-400" },
] as const;

function insightText(ind: ChileIndicator, key: "student" | "worker" | "citizen"): string {
  if (key === "student") return ind.insight_student;
  if (key === "worker") return ind.insight_worker;
  return ind.insight_citizen;
}

export default function IndicatorCard({ indicator: ind }: { indicator: ChileIndicator }) {
  const [tab, setTab] = useState<"student" | "worker" | "citizen" | null>(null);

  const isUp = ind.dir === "up";
  const isDown = ind.dir === "down";
  const DirIcon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;
  const varColor = isUp
    ? "text-emerald-600 dark:text-emerald-400"
    : isDown
    ? "text-red-500 dark:text-red-400"
    : "text-gray-400 dark:text-gray-500";

  const activeInsight = tab ? insightText(ind, tab) : null;

  return (
    <div className="flex flex-col bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-200 hover:border-teal-200 dark:hover:border-teal-800">

      {/* Datos principales */}
      <a
        href={ind.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={ind.name}
        className="group flex flex-col gap-1.5 p-4 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-colors duration-200"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            {ind.code}
          </span>
          <ExternalLink className="w-3 h-3 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-gray-900 dark:text-white tabular-nums leading-tight">
            {ind.value}
          </span>
          <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${varColor}`}>
            <DirIcon className="w-3 h-3" />
            {ind.variation}
          </span>
        </div>
        {ind.microNota && (
          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
            {ind.microNota}
          </p>
        )}
        <span className="text-[10px] text-gray-300 dark:text-gray-600 mt-auto pt-1 border-t border-gray-100 dark:border-gray-700/50">
          {ind.source} · {ind.period}
        </span>
      </a>

      {/* Tabs de persona */}
      <div className="border-t border-gray-100 dark:border-gray-700/50 flex items-center bg-white dark:bg-gray-900/40">
        {PERSONA_TABS.map(({ key, label, Icon, color }) => (
          <button
            key={key}
            onClick={() => setTab(tab === key ? null : key)}
            aria-pressed={tab === key}
            className={`flex-1 flex items-center justify-center gap-1 py-2 text-[10px] font-semibold transition-colors border-b-2 ${
              tab === key
                ? `border-teal-500 ${color} bg-teal-50 dark:bg-teal-950/30`
                : "border-transparent text-gray-400 dark:text-gray-500 hover:text-teal-700 dark:hover:text-teal-400"
            }`}
          >
            <Icon className="w-3 h-3" />
            {label}
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${
                tab === key ? "rotate-180" : ""
              }`}
            />
          </button>
        ))}
      </div>

      {/* Panel de insight activo */}
      {activeInsight && (
        <div className="px-4 py-3 bg-teal-50 dark:bg-teal-950/30 border-t border-teal-100 dark:border-teal-800/50">
          <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed">
            {activeInsight}
          </p>
          {ind.relatedConceptSlug && ind.relatedConceptLabel && (
            <Link
              href={`/recursos#${ind.relatedConceptSlug}`}
              className="inline-block mt-2 text-[10px] text-teal-700 dark:text-teal-400 hover:underline font-medium"
            >
              → {ind.relatedConceptLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
