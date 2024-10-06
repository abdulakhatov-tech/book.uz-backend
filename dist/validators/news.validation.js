"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsQuerySchema = void 0;
const zod_1 = require("zod");
exports.newsQuerySchema = zod_1.z.object({
    page: zod_1.z
        .string()
        .regex(/^\d+$/, "Page must be a positive number")
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 1)), // Default to 1 if not provided
    limit: zod_1.z
        .string()
        .regex(/^\d+$/, "Limit must be a positive number")
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 12)), // Default to 12 if not provided
    type: zod_1.z
        .enum(["all", "news", "newBook", "discounts"])
        .optional()
        .default("all"),
});
