import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripeKey = process.env.STRIPE_KEY;
if (!stripeKey) {
  throw new Error("Stripe API key is missing from environment variables.");
}

const stripe = new Stripe(stripeKey);

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { books, couponCode} = req.body;

  // Calculate total price based on the books provided
  let totalPrice = books.reduce(
    (acc: number, item: any) => acc + item.bookPrice * item.quantity,
    0
  );

  // Apply couponCode as a percentage discount if available
  if (couponCode) {
    const discount = (couponCode / 100) * totalPrice;
    totalPrice = totalPrice - discount;
  }

  // Create line items for Stripe
  const line_items = books.map((item: any) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.book.name,
        images: [item.book.imgUrl], // Ensure you have the book name here
      },
      unit_amount: item.bookPrice * 100, // Convert to cents
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.send({
      url: session.url,
    });
  } catch (error) {
    res.status(500).send({ error: "Error creating checkout session" });
  }
};
