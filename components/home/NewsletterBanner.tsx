"use client";

import { useState } from "react";
import { Mail, ArrowRight, Loader2, GraduationCap, Briefcase, Globe } from "lucide-react";

// Mockup de una edición del brief — reemplazar con datos reales cuando exista la primera edición
const BRIEF_PREVIEW = {
  fecha: "Lunes 21 Abr · Semana 17",
  items: [
    {
      n: "01",
      cat: "Economía",
      titulo: "BCCh pausa recortes: TPM se mantiene en 5%",
      nota: "El crédito hipotecario y de consumo seguirá caro al menos hasta julio.",
    },
    {
      n: "02",
      cat: "Mercados",
      titulo: "Cobre sobre USD 4,8/lb — ¿cuánto le llega a Codelco?",
      nota: "Precio récord, pero producción cae 10%: el excedente fiscal será menor al esperado.",
    },
    {
      n: "03",
      cat: "Negocios",
      titulo: "Retail chileno cae 3,2% en Q1: el consumidor en modo ahorro",
      nota: "E-commerce crece 8%, tiendas físicas sangran. Falabella cierra locales.",
    },
  ],
};

const PERSONAS = [
  {
    Icon: GraduationCap,
    label: "Estudiante",
    desc: "Llega a clases, pruebas y casos con ejemplos actuales ya digeridos.",
    color: "text-teal-400",
    bg: "bg-teal-700/10 border-teal-700/20",
  },
  {
    Icon: Briefcase,
    label: "Profesional",
    desc: "Arranca la semana con contexto fresco para sonar informado en reuniones.",
    color: "text-amber-400",
    bg: "bg-amber-700/10 border-amber-700/20",
  },
  {
    Icon: Globe,
    label: "Ciudadano",
    desc: "Entiende qué te afecta en el bolsillo, el trabajo y el país.",
    color: "text-blue-400",
    bg: "bg-blue-700/10 border-blue-700/20",
  },
];

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
    <section id="suscribir" className="bg-[#1F2937] dark:bg-gray-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Eyebrow */}
        <div className="flex justify-center mb-6">
          <span className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-widest bg-teal-700/15 border border-teal-700/30 px-4 py-1.5 rounded-full">
            <Mail className="w-3.5 h-3.5" />
            Brief semanal — gratis
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center leading-tight mb-4">
          5 minutos al lunes.{" "}
          <span className="text-teal-400">Todo el contexto que necesitas.</span>
        </h2>
        <p className="text-gray-400 text-center text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Cada semana: las 3–5 noticias que importan, los indicadores de Chile explicados y un concepto listo para usar en clases o en la pega.
        </p>

        {/* Para quién es */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
          {PERSONAS.map(({ Icon, label, desc, color, bg }) => (
            <div
              key={label}
              className={`flex flex-col gap-2 border rounded-xl p-4 ${bg}`}
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className={`text-xs font-bold uppercase tracking-widest ${color}`}>
                  {label}
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Preview del brief */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 mb-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Ejemplo de edición
            </span>
            <span className="text-[10px] text-gray-600">{BRIEF_PREVIEW.fecha}</span>
          </div>
          <div className="space-y-3">
            {BRIEF_PREVIEW.items.map((item) => (
              <div
                key={item.n}
                className="flex gap-3 items-start border-b border-white/5 last:border-0 pb-3 last:pb-0"
              >
                <span className="text-[10px] font-black text-gray-700 tabular-nums w-5 shrink-0 mt-0.5">
                  {item.n}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] font-bold text-teal-400 uppercase tracking-widest">
                      {item.cat}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white leading-snug mb-0.5">
                    {item.titulo}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.nota}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario */}
        {state === "done" ? (
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-teal-700/20 border border-teal-700/40 text-teal-300 px-6 py-3 rounded-full text-sm font-medium">
              ✓ ¡Listo! Te avisamos cuando salga la primera edición.
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setState("idle");
                }}
                placeholder="tu@email.com"
                required
                disabled={state === "loading"}
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap disabled:opacity-60"
              >
                {state === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Quiero el brief <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
            {state === "error" && (
              <p className="text-red-400 text-xs mt-2 text-center">{errorMsg}</p>
            )}
            <p className="text-xs text-gray-600 mt-4 text-center">
              Sin spam. Te das de baja cuando quieras.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
