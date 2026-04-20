"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { noticias } from "@/lib/data/noticias";
import CategoryBadge from "@/components/ui/CategoryBadge";

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const SUGERIDAS = noticias
  .filter((n) => n.principal || n.destacada)
  .slice(0, 5);

/** Botón de búsqueda que abre el modal. Exportado para usarlo en Header. */
export function SearchButton() {
  const [open, setOpen] = useState(false);

  // ⌘K / Ctrl+K
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Buscar noticias"
      >
        <Search className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden sm:inline">Buscar</span>
        <kbd className="hidden md:inline text-[10px] bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-1 leading-none py-0.5">
          ⌘K
        </kbd>
      </button>
      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  );
}

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(onClose, [onClose]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  const results =
    query.trim().length > 1
      ? noticias
          .filter((n) => {
            const q = norm(query);
            return (
              norm(n.titulo).includes(q) ||
              norm(n.bajada).includes(q) ||
              norm(n.categoria).includes(q) ||
              n.tags?.some((t) => norm(t).includes(q))
            );
          })
          .slice(0, 8)
      : [];

  const showEmpty = query.trim().length > 1 && results.length === 0;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Buscar noticias"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={close}
      />

      {/* Panel */}
      <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar noticias, temas, categorías…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
          />
          <button
            onClick={close}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* Empty state */}
          {showEmpty && (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-10">
              Sin resultados para &ldquo;{query}&rdquo;
            </p>
          )}

          {/* Results */}
          {results.map((n) => (
            <Link
              key={n.slug}
              href={`/noticia/${n.slug}`}
              onClick={close}
              className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0 group"
            >
              <div className="flex-1 min-w-0">
                <div className="mb-1">
                  <CategoryBadge category={n.categoria} size="sm" linked={false} />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug group-hover:text-teal-700 dark:group-hover:text-teal-400 line-clamp-2">
                  {n.titulo}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-1">
                  {n.bajada}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}

          {/* Default: sugeridas */}
          {query.trim().length <= 1 && (
            <div className="px-4 py-5">
              <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                Sugeridas
              </p>
              <div className="space-y-0.5">
                {SUGERIDAS.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/noticia/${n.slug}`}
                    onClick={close}
                    className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 text-gray-300 dark:text-gray-600 group-hover:text-teal-500 transition-colors shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-teal-700 dark:group-hover:text-teal-400 line-clamp-1 flex-1">
                      {n.titulo}
                    </span>
                    <CategoryBadge category={n.categoria} size="sm" linked={false} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-gray-50 dark:border-gray-800 flex items-center gap-3 text-[10px] text-gray-300 dark:text-gray-600">
          <span><kbd className="font-mono">↵</kbd> abrir</span>
          <span><kbd className="font-mono">Esc</kbd> cerrar</span>
        </div>
      </div>
    </div>
  );
}
