"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'book',
        required: true,
    },
    bookId: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
const ReviewModel = (0, mongoose_1.model)('review', reviewSchema);
exports.default = ReviewModel;
