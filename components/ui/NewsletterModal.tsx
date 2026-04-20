"use client";

import { useState, useEffect } from "react";
import { X, Mail, ArrowRight, Check, Loader2 } from "lucide-react";

export default function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  useEffect(() => {
    const dismissed = sessionStorage.getItem("cc-nl-dismissed");
    if (dismissed) return;
    const timer = setTimeout(() => setOpen(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    sessionStorage.setItem("cc-nl-dismissed", "1");
    setOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setState("done");
      setTimeout(() => {
        sessionStorage.setItem("cc-nl-dismissed", "1");
        setTimeout(() => setOpen(false), 1500);
      }, 2000);
    } catch {
      setState("error");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={dismiss}
      />
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-7 border border-gray-100 dark:border-gray-700 animate-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-teal-700 rounded-xl flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
              Brief semanal
            </p>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
              Lo esencial, cada semana
            </h3>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
          Economía, finanzas, marketing e innovación explicados en 5 minutos. Para ingenieros comerciales que quieren entender el mundo.
        </p>

        {state === "done" ? (
          <div className="flex items-center gap-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-800 rounded-xl p-4">
            <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-teal-800 dark:text-teal-300">¡Listo!</p>
              <p className="text-xs text-teal-700 dark:text-teal-400">Te avisamos cuando salgamos al aire.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
              placeholder="tu@email.com"
              required
              disabled={state === "loading"}
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition disabled:opacity-60"
            />
            {state === "error" && (
              <p className="text-red-500 text-xs -mt-1">Error al enviar. Intenta de nuevo.</p>
            )}
            <button
              type="submit"
              disabled={state === "loading"}
              className="flex items-center justify-center gap-2 w-full bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
            >
              {state === "loading" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Suscribirme gratis <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        )}

        <p className="text-[11px] text-gray-400 dark:text-gray-600 mt-3 text-center">
          Sin spam. Puedes darte de baja cuando quieras.
        </p>
      </div>
    </div>
  );
}
