"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PromocodeSchema = new mongoose_1.Schema({
    couponCode: {
        type: String,
        required: true,
        unique: true
    },
    discount: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
});
const PromocodeModel = (0, mongoose_1.model)('coupon-Code', PromocodeSchema);
exports.default = PromocodeModel;
