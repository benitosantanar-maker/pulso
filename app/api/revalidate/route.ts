/**
 * POST /api/revalidate?tag=news  — on-demand revalidation
 * Llamar desde un cron externo (Vercel Cron, GitHub Actions, etc.)
 */
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const tag = req.nextUrl.searchParams.get("tag") ?? "news";
  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, tag, now: Date.now() });
}
