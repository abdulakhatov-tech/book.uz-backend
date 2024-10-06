"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DeliveryMethodSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["courier", "pickup", "postal"],
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
const DeliveryMethodModel = (0, mongoose_1.model)('delivery-method', DeliveryMethodSchema);
exports.default = DeliveryMethodModel;
