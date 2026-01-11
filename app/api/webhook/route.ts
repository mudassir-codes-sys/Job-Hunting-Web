import connectDB from "@/app/config/db";
import subscriptionModel from "@/app/models/subscriptionModel";
import { userModel } from "@/app/models/userModel";
import sendResponse from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) return sendResponse(false, "No signature", 400);
  try {
    const event: Stripe.Event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    const session = event.data.object as Stripe.Checkout.Session;
    const { userId, plan } = session.metadata!;
    if (!userId || !plan) {
      return NextResponse.redirect(
        new URL(process.env.FRONTEND_URL + "/error", req.url)
      );
    }
    await connectDB();
    if (event.type === "checkout.session.completed") {
      await userModel.findOneAndUpdate(
        {
          _id: userId,
        },
        { isPaid: true }
      );
    }

    let expiryDate = null;
    if (event.type === "checkout.session.completed" && session.subscription) {
      if (plan === "Monthly")
        expiryDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
      else
        expiryDate = new Date(
          new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        );
    }

    const saveSession = new subscriptionModel({
      userId,
      plan,
      stripeSessionId: session.id,
      stripeCustomerId: session.customer,
      stripeSubscriptionId: session.subscription,
      paymentStatus: session.payment_status,
      email: session.customer_details?.email,
      status: session.status,
      totalAmount: session.amount_total
        ? Number(session.amount_total / 100)
        : 0,
      currency: session.currency,
      paymentDate: new Date(session.created * 1000),
      expiryDate,
    });
    await saveSession.save();
    return event.type === "checkout.session.completed"
      ? sendResponse(true, "Payment Successful", 201)
      : NextResponse.redirect(
          new URL(process.env.FRONTEND_URL + "/error", req.url)
        );
  } catch (error) {
    console.error((error as Error).message);
  }
}
