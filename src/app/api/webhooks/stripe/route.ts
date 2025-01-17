import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import User from "@/models/user.model";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET_KEY as string;

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (error: any) {
    console.log("Signature verification failed", error.message);

    return NextResponse.json(
      { error: `Webhook error ${error.message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          {
            expand: ["line-items"],
          }
        );

        const customerId = session.customer as string;
        const customerDetails = session.customer_details;

        if (customerDetails?.email) {
          const user = await User.findOne({ email: customerDetails?.email });
        }
    }
  } catch (error) {}
}
