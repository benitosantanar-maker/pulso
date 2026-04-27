"use client";

import { useState } from "react";

export default function NewsletterBanner() {
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
      if (!res.ok) throw new Error("Error");
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <section style={{ background: "var(--ink)", padding: "52px 0" }}>
      <div className="cc-container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>

          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "12px" }}>
              ▸ Brief semanal gratuito
            </div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "30px", fontWeight: 700, color: "#F0EDE8", lineHeight: 1.15, marginBottom: "12px" }}>
              El resumen que sí vale la pena leer
            </h2>
            <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "#6A6660", lineHeight: 1.6 }}>
              Cada semana, lo más importante en economía, finanzas, mercados e innovación — explicado con contexto, sin ruido.
            </p>
          </div>

          <div>
            <ul style={{ listStyle: "none", marginBottom: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                "3–5 noticias clave con contexto: qué pasó y por qué importa",
                "Indicadores de Chile explicados: TPM, IPC, dólar, empleo",
                "Un concepto de finanzas o estrategia explicado simple",
                "Selección de lecturas imprescindibles de la semana",
              ].map((perk) => (
                <li key={perk} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontFamily: "var(--sans)", fontSize: "13.5px", color: "#C0BDB8" }}>
                  <span style={{ fontFamily: "var(--mono)", color: "var(--amber)", flexShrink: 0 }}>→</span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            {state === "done" ? (
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid #3A3630", color: "#4DB87A", fontFamily: "var(--sans)", fontSize: "13px", padding: "12px 24px" }}>
                ✓ ¡Suscrito! Te avisamos en el próximo brief.
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} style={{ display: "flex" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
                    placeholder="tu@email.com"
                    required
                    style={{ flex: 1, background: "#1E1B17", border: "1px solid #3A3630", borderRight: "none", color: "#F0EDE8", fontFamily: "var(--sans)", fontSize: "14px", padding: "12px 16px", outline: "none" }}
                  />
                  <button
                    type="submit"
                    disabled={state === "loading"}
                    style={{ background: "var(--amber)", color: "white", border: "none", fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "12px 24px", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    {state === "loading" ? "..." : "Suscribirse →"}
                  </button>
                </form>
                {state === "error" && (
                  <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--red)", marginTop: "8px" }}>
                    Hubo un error. Intenta de nuevo.
                  </p>
                )}
              </>
            )}
            <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "#4A4740", letterSpacing: "0.04em", marginTop: "10px" }}>
              Sin spam. Puedes darte de baja cuando quieras.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
