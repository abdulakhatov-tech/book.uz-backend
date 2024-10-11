"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusValidationSchema = exports.OrderIdValidationSchema = exports.OrderValidatorSchema = void 0;
const zod_1 = require("zod");
const BillingAddressSchema = zod_1.z.object({
    region: zod_1.z.string().length(24, { message: "Invalid region ID" }), // Assuming ObjectId as a 24-character hex string
    district: zod_1.z.string().length(24, { message: "Invalid district ID" }), // Assuming ObjectId as a 24-character hex string
    extraAddress: zod_1.z.string().min(1, { message: "Extra address is required" }),
});
const BookSchema = zod_1.z.object({
    book: zod_1.z.string().length(24, { message: "Invalid book ID" }), // ObjectId validation
    quantity: zod_1.z.number().min(1, { message: "Quantity must be at least 1" }),
});
exports.OrderValidatorSchema = zod_1.z.object({
    user: zod_1.z.string().length(24, { message: "Invalid user ID" }), // ObjectId validation
    books: zod_1.z
        .array(BookSchema)
        .min(1, { message: "At least one book must be ordered" }),
    delivery_method: zod_1.z.enum(["courier", "pickup", "postal"], {
        required_error: "Delivery method is required",
    }),
    payment_method: zod_1.z.enum(["payme", "click", "cash"], {
        required_error: "Payment method is required",
    }),
    billingAddress: BillingAddressSchema,
    extra_note: zod_1.z.string().optional(),
    price: zod_1.z.number()
});
exports.OrderIdValidationSchema = zod_1.z.object({
    orderId: zod_1.z.string().length(24, { message: "Invalid order ID" }),
});
exports.OrderStatusValidationSchema = zod_1.z.object({
    status: zod_1.z.enum(["pending", "processing", "delivered", "canceled"], {
        required_error: "Status is required"
    })
});
