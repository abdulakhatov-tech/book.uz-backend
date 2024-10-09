"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerIdValidator = exports.UpdateBannerValidator = exports.CreateBannerValidator = void 0;
const zod_1 = require("zod");
exports.CreateBannerValidator = zod_1.z.object({
    title: zod_1.z.string().min(1, {
        message: "Title is required"
    }),
    link: zod_1.z.string().min(1, {
        message: "Link is required"
    }),
    imgUrl: zod_1.z.string().url({
        message: "Image must be a valid URL"
    }),
});
exports.UpdateBannerValidator = zod_1.z.object({
    title: zod_1.z.string().min(1, {
        message: "Title is required"
    }).optional(),
    link: zod_1.z.string().min(1, {
        message: "Link is required"
    }).optional(),
    imgUrl: zod_1.z.string().url({
        message: "Image must be a valid URL"
    }).optional(),
});
exports.BannerIdValidator = zod_1.z.object({
    bannerId: zod_1.z.string().min(1, {
        message: "Banner ID is required"
    })
});
