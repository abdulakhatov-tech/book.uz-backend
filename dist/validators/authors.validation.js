"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorIdSchema = exports.authorPaginationQuerySchema = exports.updateAuthorSchema = exports.createAuthorSchema = void 0;
const zod_1 = require("zod");
exports.createAuthorSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, "Full name is required"),
    biography: zod_1.z.string().min(1, "Biography is required"),
});
exports.updateAuthorSchema = zod_1.z.object({
    fullName: zod_1.z.string().optional(),
    biography: zod_1.z.string().optional(),
});
exports.authorPaginationQuerySchema = zod_1.z.object({
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
exports.authorIdSchema = zod_1.z.object({
    authorId: zod_1.z.string().min(1, "Author ID is required"),
});
