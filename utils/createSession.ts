import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const createSession = async (priceId: string, userId: string, plan: string) => {
  try {
    return await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: process.env.FRONTEND_URL + "/success",
      cancel_url: process.env.FRONTEND_URL + "/false",
      metadata: {
        userId,
        plan,
      },
    });
  } catch (error) {
    console.error((error as Error).message);
  }
};

export default createSession;
