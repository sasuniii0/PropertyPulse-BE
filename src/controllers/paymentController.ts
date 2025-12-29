import { Request, Response } from "express";
import { stripe } from "../config/stripe";
import { AuthRequest } from "../middlewares/authMiddleware";
import PaymentModel from "../models/paymentModal";
import { PaymentStatus } from "../models/userModel";
import { User } from "../models/userModel";

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

    const payment = await PaymentModel.create({
      userId,
      amount: 5000, // match Stripe amount
      paymentStatus: PaymentStatus.PAID,
    });
    
    await User.findByIdAndUpdate(payment.userId, { paymentStatus: PaymentStatus.PAID });


    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Stripe session failed" });
  }
};

// Mark payment as PAID and update user status
export const confirmPayment = async (req: AuthRequest, res: Response) => {
  const { paymentId } = req.body;

  try {
    const payment = await PaymentModel.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    // Update payment status
    payment.paymentStatus = PaymentStatus.PAID;
    await payment.save();

    // Update user paymentStatus
    await User.findByIdAndUpdate(payment.userId, { paymentStatus: PaymentStatus.PAID });

    res.json({ success: true, paymentStatus: payment.paymentStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Payment confirmation failed" });
  }
};