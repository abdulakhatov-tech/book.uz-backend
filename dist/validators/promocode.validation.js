"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promocodeSchema = void 0;
const zod_1 = require("zod");
exports.promocodeSchema = zod_1.z.object({
    couponCode: zod_1.z.string().nonempty("couponCode is required"),
});
