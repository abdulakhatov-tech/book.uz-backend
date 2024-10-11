"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    books: [
        {
            book: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'book',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    delivery_method: {
        type: String,
        enum: ['courier', 'pickup', 'postal'],
        required: true
    },
    payment_method: {
        type: String,
        enum: ['payme', 'click', 'cash'],
        required: true
    },
    billingAddress: {
        region: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'region',
            required: true
        },
        district: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'district',
            required: true
        },
        extraAddress: {
            type: String,
            required: true,
        }
    },
    extra_note: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'delivered', 'canceled'],
        default: 'pending'
    },
    price: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true,
});
const OrderModel = (0, mongoose_1.model)('order', OrderSchema);
exports.default = OrderModel;
