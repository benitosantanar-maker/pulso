"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function FooterNewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

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
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="text-sm text-teal-400 font-medium py-2">
        ✓ ¡Anotado! Te escribimos pronto.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
        placeholder="tu@email.com"
        required
        disabled={state === "loading"}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors disabled:opacity-60"
      />
      {state === "error" && (
        <p className="text-red-400 text-xs">Error. Intenta de nuevo.</p>
      )}
      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full flex items-center justify-center gap-2 bg-teal-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-60"
      >
        {state === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "Suscribirse gratis"
        )}
      </button>
    </form>
  );
}
