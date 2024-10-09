"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserBodyValidator = exports.UserIdValidator = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
exports.UserIdValidator = zod_1.z.object({
    userId: zod_1.z.string().min(1, "Invalid user ID"), // User ID should be a non-empty string
});
exports.UpdateUserBodyValidator = zod_1.z.object({
    name: zod_1.z.string().optional(),
    surname: zod_1.z.string().optional(),
    phoneNumber: zod_1.z.string().optional(),
    profilePhoto: zod_1.z.string().url().optional(),
    email: zod_1.z.string().email().optional(),
    bio: zod_1.z.string().optional(),
    balance: zod_1.z.number().optional(),
    frozenBalance: zod_1.z.number().optional(),
    lastEnteredAt: zod_1.z.string().optional(),
    billingAddress: zod_1.z.object({
        region: zod_1.z.preprocess((value) => {
            if (typeof value === 'string')
                return new mongoose_1.Types.ObjectId(value);
            return value;
        }, zod_1.z.instanceof(mongoose_1.Types.ObjectId).nullable().optional()),
        district: zod_1.z.preprocess((value) => {
            if (typeof value === 'string')
                return new mongoose_1.Types.ObjectId(value);
            return value;
        }, zod_1.z.instanceof(mongoose_1.Types.ObjectId).nullable().optional()),
        extraAddress: zod_1.z.string().optional(),
    }).optional(),
});
