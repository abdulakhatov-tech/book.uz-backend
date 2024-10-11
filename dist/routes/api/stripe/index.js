"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = require("../../../controller/stripe");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/create-checkout-session", stripe_1.createCheckoutSession);
exports.default = router;
