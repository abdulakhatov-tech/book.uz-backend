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
    link: {
        type: String,
    },
}, {
    timestamps: true,
});
newsSchema.pre("save", function (next) {
    if (this.title && this.title.length > 0) {
        this.link = this.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "") // Remove all punctuation and symbols except hyphens
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .trim(); // Trim leading/trailing spaces or hyphens
    }
    next();
});
const newsModel = (0, mongoose_1.model)('news', newsSchema);
exports.default = newsModel;
