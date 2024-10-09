"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    surname: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^\+?[1-9]\d{1,14}$/,
    },
    profilePhoto: {
        type: String,
        default: "https://productivemuslim.com/wp-content/uploads/2017/01/Book-Review-The-Productive-Muslim-by-Mohammed-Faris-600.jpg",
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        default: "",
    },
    bio: {
        type: String,
        trim: true,
        default: "",
    },
    balance: {
        type: Number,
        default: 0,
        min: 0,
    },
    frozenBalance: {
        type: Number,
        default: 0,
        min: 0,
    },
    lastEnteredAt: {
        type: Date,
        default: Date.now,
    },
    signInAttempts: {
        type: Number,
        default: 0,
        min: 0,
    },
    role: {
        type: String,
        enum: ["user", "admin", "owner"],
        default: "user",
    },
    orders: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "order",
            default: [],
        },
    ],
    books: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "book",
            default: [],
        },
    ],
    wishlist: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "book",
            default: [],
        },
    ],
    billingAddress: {
        region: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "region",
            default: null,
        },
        district: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "district",
            default: null,
        },
        extraAddress: {
            type: String,
            trim: true,
            default: "",
        },
    },
}, { timestamps: true });
const UserModel = (0, mongoose_1.model)("user", UserSchema);
exports.default = UserModel;
