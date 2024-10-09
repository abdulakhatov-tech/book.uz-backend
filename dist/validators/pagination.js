"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationQueryValidator = void 0;
const zod_1 = require("zod");
exports.PaginationQueryValidator = zod_1.z.object({
    page: zod_1.z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 1))
        .refine((val) => val > 0, { message: "Page must be greater than 0" }),
    limit: zod_1.z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 24))
        .refine((val) => val > 0, { message: "Limit must be greater than 0" }),
    search: zod_1.z.string().optional().default(""),
});
