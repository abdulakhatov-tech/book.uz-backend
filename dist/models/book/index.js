"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const genre_1 = __importDefault(require("../genre"));
const author_1 = __importDefault(require("../author"));
const bookSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    genre: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "genre",
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "author",
    },
    amount: {
        type: Number,
        required: true,
    },
    bookPrice: {
        type: Number,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    hasDiscount: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        required: true,
    },
    numberOfPage: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    barcode: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    additionalImages: {
        type: [String],
        default: [],
    },
    rateCount: {
        type: Number,
        default: 0,
    },
    ratedBy: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    rating: {
        type: Number,
        default: 0,
    },
    soldBookCount: {
        type: Number,
        default: 0,
    },
    link: {
        type: String,
    }
}, { timestamps: true });
// middleware to set hasDiscount and generate the link
bookSchema.pre("save", function (next) {
    this.hasDiscount = this.discount && this.discount > 0 ? true : false;
    if (this.name.length > 0) {
        this.link = this.name.split(" ").join("-").toLowerCase();
    }
    next();
});
// middleware to increment the genre's bookCount
bookSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield genre_1.default.findByIdAndUpdate(doc.genre, { $inc: { bookCount: 1 } });
            yield author_1.default.findByIdAndUpdate(doc.author, { $inc: { bookCount: 1 } });
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
// middleware to decrement the genre's bookCount
bookSchema.post("findOneAndDelete", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield genre_1.default.findByIdAndUpdate(doc.genre, { $inc: { bookCount: -1 } });
            yield author_1.default.findByIdAndUpdate(doc.author, { $inc: { bookCount: -1 } });
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
const BookModel = (0, mongoose_1.model)("book", bookSchema);
exports.default = BookModel;
