"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionIdSchema = void 0;
const zod_1 = require("zod");
exports.regionIdSchema = zod_1.z.object({
    regionId: zod_1.z.string().min(1, "Region ID is required"),
});
