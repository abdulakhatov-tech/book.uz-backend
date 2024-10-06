"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentMethodSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["payme", "cash", "click"],
        required: true,
    },
}, {
    timestamps: true,
});
const PaymentMethodModel = (0, mongoose_1.model)('payment-method', PaymentMethodSchema);
exports.default = PaymentMethodModel;
