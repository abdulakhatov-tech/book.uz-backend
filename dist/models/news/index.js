"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const newsSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "book",
        default: null
    },
    content: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    isRead: {
        type: Number,
        default: 0,
    },
    readCount: {
        type: Number,
        default: 0,
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["news", "newBook"],
        default: "news",
    },
}, {
    timestamps: true,
});
const newsModel = (0, mongoose_1.model)('news', newsSchema);
exports.default = newsModel;
