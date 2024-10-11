import { createCheckoutSession } from '../../../controller/stripe';
import { Router } from "express";

const router = Router();

router.post("/create-checkout-session", createCheckoutSession);

export default router;
