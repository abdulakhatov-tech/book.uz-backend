import { Router } from "express";
import { signIn, signUp, verifyOTP } from "../../../controller/auth";

const router = Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/verify-otp", verifyOTP);

export default router;