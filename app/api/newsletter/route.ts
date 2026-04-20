/**
 * POST /api/newsletter
 * Body: { email: string }
 *
 * Para conectar con un proveedor real, añade la variable de entorno
 * correspondiente y descomenta el bloque de tu servicio favorito:
 *
 *  — Resend:     RESEND_API_KEY
 *  — Mailchimp:  MAILCHIMP_API_KEY + MAILCHIMP_LIST_ID + MAILCHIMP_DC
 */

import { NextRequest, NextResponse } from "next/server";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Email inválido." },
        { status: 400 }
      );
    }

    // ── Opción A: Resend ──────────────────────────────────────────────────
    // Descomenta cuando tengas RESEND_API_KEY en las variables de entorno.
    //
    // const resendKey = process.env.RESEND_API_KEY;
    // if (resendKey) {
    //   const res = await fetch("https://api.resend.com/audiences/{audience_id}/contacts", {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${resendKey}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email }),
    //   });
    //   if (!res.ok) throw new Error("Resend error");
    // }

    // ── Opción B: Mailchimp ───────────────────────────────────────────────
    // const mcKey = process.env.MAILCHIMP_API_KEY;
    // const mcList = process.env.MAILCHIMP_LIST_ID;
    // const mcDc = process.env.MAILCHIMP_DC; // ej. "us21"
    // if (mcKey && mcList && mcDc) {
    //   await fetch(`https://${mcDc}.api.mailchimp.com/3.0/lists/${mcList}/members`, {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Basic ${Buffer.from(`anystring:${mcKey}`).toString("base64")}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email_address: email, status: "subscribed" }),
    //   });
    // }

    // ── Log para desarrollo ───────────────────────────────────────────────
    console.log(`[newsletter] nuevo suscriptor: ${email}`);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Error interno. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
