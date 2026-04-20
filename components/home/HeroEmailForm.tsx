"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

export default function HeroEmailForm() {
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

  if (state === "done") {
    return (
      <div className="inline-flex items-center gap-2 bg-teal-700/20 border border-teal-700/40 text-teal-300 px-6 py-3 rounded-full text-sm font-medium">
        ✓ ¡Listo! Te avisamos cuando salgamos.
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
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
          className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors whitespace-nowrap disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-[#1F2937]"
        >
          {state === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Quiero lo esencial <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
      {state === "error" && (
        <p className="text-red-400 text-xs mt-2 text-center">{errorMsg}</p>
      )}
    </div>
  );
}
