import { getMarketTickers } from "@/lib/market";
import { NextResponse } from "next/server";

// Sin ISR — datos frescos cada vez que el cliente pide
export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getMarketTickers();
  return NextResponse.json(data, {
    headers: {
      // Cache en CDN 5 min, stale-while-revalidate 1 min
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
