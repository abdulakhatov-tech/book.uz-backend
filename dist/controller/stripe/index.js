"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = void 0;
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripeKey = process.env.STRIPE_KEY;
if (!stripeKey) {
    throw new Error("Stripe API key is missing from environment variables.");
}
const stripe = new stripe_1.default(stripeKey);
const createCheckoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { books, couponCode } = req.body;
    // Calculate total price based on the books provided
    let totalPrice = books.reduce((acc, item) => acc + item.bookPrice * item.quantity, 0);
    // Apply couponCode as a percentage discount if available
    if (couponCode) {
        const discount = (couponCode / 100) * totalPrice;
        totalPrice = totalPrice - discount;
    }
    // Create line items for Stripe
    const line_items = books.map((item) => ({
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
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/checkout-success`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
        });
        res.send({
            url: session.url,
        });
    }
    catch (error) {
        res.status(500).send({ error: "Error creating checkout session" });
    }
});
exports.createCheckoutSession = createCheckoutSession;
