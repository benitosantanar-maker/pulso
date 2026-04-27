/**
 * GET /api/brief/cron
 * Vercel Cron: cada día a las 11:00 UTC (08:00 Chile).
 * Pre-genera el brief con Claude + RSS y lo guarda en /tmp.
 */

import { NextRequest, NextResponse } from "next/server";
import { forceRegenerate } from "@/lib/brief/generator";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET ?? process.env.REVALIDATE_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("[cron/brief] Iniciando regeneración diaria...");
    // forceRegenerate borra el cache del día y genera uno fresco
    const brief = await forceRegenerate();
    return NextResponse.json({
      ok: true,
      fecha: brief.fecha,
      items: brief.items.length,
      fuenteIA: brief.fuenteIA,
      generadoEn: brief.generadoEn,
    });
  } catch (err) {
    console.error("[cron/brief] Error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
