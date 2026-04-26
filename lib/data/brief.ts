/**
 * lib/data/brief.ts
 *
 * El brief diario se genera dinámicamente desde fetchDailyBrief() en lib/feeds/index.ts.
 * Este archivo solo exporta helpers de fecha y formateo usados en las páginas del brief.
 */

import type { Brief } from "@/types";

// ─── Helpers de fecha ─────────────────────────────────────────────────────────

export function todayDateStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function formatBriefTitle(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00Z");
  return d.toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Capitaliza la primera letra */
export function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ─── Compatibilidad con código que aún use getLatestBrief ─────────────────────
// Solo para no romper imports existentes — retorna un brief vacío.

export function getLatestBrief(): Brief {
  return {
    fecha: todayDateStr(),
    titulo: `Brief del día — ${capitalize(formatBriefTitle(todayDateStr()))}`,
    intro: "Cargando las noticias más relevantes del día…",
    items: [],
  };
}

export const briefs: Brief[] = [];
