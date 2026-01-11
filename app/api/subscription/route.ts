import createSession from "@/utils/createSession";
import sendResponse from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const userId = req.headers.get("x-userId");
  if (!userId) return sendResponse(false, "Not authorized", 400);
  try {
    const { price, plan } = await req.json();
    if (!price) return sendResponse(false, "Select a plan to proceed", 400);
    const priceId =
      price === 29
        ? process.env.MONTHLY_PRICE_ID!
        : process.env.YEARLY_PRICE_ID!;

    const session = await createSession(priceId, userId, plan);

    return NextResponse.json({ success: true, url: session?.url });
  } catch (error) {
    console.error((error as Error).message);
  }
}
