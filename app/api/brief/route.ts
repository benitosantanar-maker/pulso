/**
 * GET /api/brief
 * Devuelve el brief del día generado con Claude.
 * Cache-Control: 3 horas en CDN.
 *
 * GET /api/brief?regenerate=1&secret=REVALIDATE_SECRET
 * Fuerza regeneración del brief (invalida caché de Next.js).
 */

import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getDynamicBrief } from "@/lib/brief/generator";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Regeneración forzada (webhook / cron)
  if (searchParams.get("regenerate") === "1") {
    const secret = searchParams.get("secret");
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    revalidateTag("brief");
    return NextResponse.json({ ok: true, message: "Brief cache invalidated" });
  }

  const brief = await getDynamicBrief();

  return NextResponse.json(brief, {
    headers: {
      "Cache-Control": "public, s-maxage=10800, stale-while-revalidate=600",
    },
  });
}
