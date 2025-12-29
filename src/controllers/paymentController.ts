import { Request, Response } from "express";
import { stripe } from "../config/stripe";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createAgentCheckoutSession = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.sub;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "lkr",
            product_data: {
              name: "Agent Subscription",
              description: "Activate agent account",
            },
            unit_amount: 500000, // LKR 5,000
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId, // important
      },
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard`,
    });
    console.log("Stripe Secret:", process.env.STRIPE_SECRET_KEY);


    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Stripe session failed" });
  }
};
