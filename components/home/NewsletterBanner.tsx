"use client";

import { useState } from "react";
import { Mail, ArrowRight, Loader2 } from "lucide-react";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Error");
      }
      setState("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Intenta de nuevo.");
      setState("error");
    }
  }

  return (
    <section className="py-16 bg-[#1F2937]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 bg-teal-700/30 rounded-xl flex items-center justify-center border border-teal-700/30">
            <Mail className="w-5 h-5 text-teal-400" />
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          El brief semanal que sí vale la pena leer
        </h2>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Cada semana, lo más importante en economía, finanzas, marketing e innovación — explicado en 5 minutos.
        </p>

        <ul className="text-left max-w-sm mx-auto mb-8 space-y-2.5">
          <li className="flex items-start gap-2.5 text-sm text-gray-400">
            <span className="text-teal-400 font-bold mt-0.5 shrink-0">→</span>
            <span>3–5 noticias clave con contexto para ingeniero comercial: qué pasó y por qué importa.</span>
          </li>
          <li className="flex items-start gap-2.5 text-sm text-gray-400">
            <span className="text-teal-400 font-bold mt-0.5 shrink-0">→</span>
            <span>Indicadores de Chile explicados: TPM, IPC, dólar, empleo — y qué significan para el mercado.</span>
          </li>
          <li className="flex items-start gap-2.5 text-sm text-gray-400">
            <span className="text-teal-400 font-bold mt-0.5 shrink-0">→</span>
            <span>Un concepto de finanzas o estrategia explicado simple, listo para usar en clases o entrevistas.</span>
          </li>
        </ul>

        {state === "done" ? (
          <div className="inline-flex items-center gap-2 bg-teal-700/20 border border-teal-700/40 text-teal-300 px-6 py-3 rounded-full text-sm font-medium">
            ✓ ¡Listo! Te avisamos cuando salgamos.
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
                placeholder="tu@email.com"
                required
                disabled={state === "loading"}
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap disabled:opacity-60"
              >
                {state === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>Suscribirme <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>
            {state === "error" && (
              <p className="text-red-400 text-xs mt-2">{errorMsg}</p>
            )}
          </>
        )}

        <p className="text-xs text-gray-600 mt-4">
          Sin spam. Puedes darte de baja cuando quieras.
        </p>
      </div>
    </section>
  );
}
