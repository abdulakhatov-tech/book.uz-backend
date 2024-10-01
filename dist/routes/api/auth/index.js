"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../controller/auth");
const router = (0, express_1.Router)();
router.post("/sign-up", auth_1.signUp);
router.post("/sign-in", auth_1.signIn);
router.post("/verify-otp", auth_1.verifyOTP);
exports.default = router;
