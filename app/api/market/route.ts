import { getMarketTickers } from "@/lib/market";
import { NextResponse } from "next/server";

export const revalidate = 3600; // 1 hora

export async function GET() {
  const data = await getMarketTickers();
  return NextResponse.json(data);
}
