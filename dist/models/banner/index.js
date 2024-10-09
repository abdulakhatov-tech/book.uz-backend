"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BannerSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const BannerModel = (0, mongoose_1.model)("banner", BannerSchema);
exports.default = BannerModel;
