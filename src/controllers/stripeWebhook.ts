import { Request, Response } from "express";
import Stripe from "stripe";
import { User } from "../models/userModel";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"]!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    if (userId) {
      await User.findByIdAndUpdate(userId, {
        paymentStatus: "PAID",
      });
    }
  }

  res.json({ received: true });
};
