"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

export default function NewsletterBanner() {
  const [email, setEmail]   = useState("");
  const [state, setState]   = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setMsg]  = useState("");

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
      setMsg(err instanceof Error ? err.message : "Intenta de nuevo.");
      setState("error");
    }
  }

  return (
    <section
      id="suscribir"
      style={{ background: "var(--ink)", padding: "52px 0" }}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: copy */}
          <div>
            <div
              className="font-mono text-[9px] uppercase tracking-[0.2em] mb-3"
              style={{ color: "#B5450A" }}
            >
              Brief Semanal
            </div>
            <h2
              className="font-serif text-[26px] lg:text-[30px] font-bold leading-[1.15] mb-4"
              style={{ color: "#F0EDE8" }}
            >
              El brief de economía y negocios que sí vale la pena leer
            </h2>
            <p
              className="font-body text-[14.5px] leading-[1.6] mb-6"
              style={{ color: "#8A8680" }}
            >
              Cada semana, lo más importante en economía, finanzas, mercados e innovación — explicado con contexto y sin ruido.
            </p>
            <ul className="space-y-2.5">
              {[
                "3–5 noticias clave: qué pasó y por qué importa.",
                "Indicadores de Chile explicados: TPM, IPC, dólar, empleo.",
                "Un concepto de finanzas o estrategia explicado simple.",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 font-sans text-[13.5px]"
                  style={{ color: "#C8C4BB" }}
                >
                  <span style={{ color: "#B5450A" }} className="font-mono shrink-0 mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div>
            {state === "done" ? (
              <div
                className="inline-flex items-center gap-2 font-sans text-sm px-6 py-3"
                style={{
                  border: "1px solid #B5450A",
                  color: "#B5450A",
                  background: "#1E1B17",
                }}
              >
                ✓ ¡Listo! Te enviamos el próximo brief.
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex gap-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
                    placeholder="tu@email.com"
                    required
                    disabled={state === "loading"}
                    className="flex-1 font-sans text-sm px-4 py-3 outline-none disabled:opacity-60"
                    style={{
                      background: "#1E1B17",
                      border: "1px solid #3A3630",
                      borderRight: "none",
                      color: "#F0EDE8",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="flex items-center justify-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.08em] px-6 py-3 text-white whitespace-nowrap disabled:opacity-60 transition-colors"
                    style={{ background: "#B5450A" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#8A3208")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#B5450A")}
                  >
                    {state === "loading" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>Suscribirme <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
                {state === "error" && (
                  <p className="font-sans text-xs mt-2" style={{ color: "#F06B55" }}>
                    {errorMsg}
                  </p>
                )}
                <p
                  className="font-mono text-[10px] mt-3 tracking-[0.04em]"
                  style={{ color: "#4A4740" }}
                >
                  Sin spam · Darse de baja en cualquier momento
                </p>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
