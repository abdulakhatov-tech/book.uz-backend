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
const book_1 = __importDefault(require("../book"));
const genre_1 = __importDefault(require("../genre"));
const authorSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        default: "",
    },
    bookCount: {
        type: Number,
        default: 0,
    },
    biography: {
        type: String,
        required: true,
    },
    dateOfbirth: {
        type: Date,
        default: null
    },
    dateOfdeath: {
        type: Date,
        default: null
    },
    imgUrl: {
        type: String,
        default: null,
    },
}, { timestamps: true });
// Post middleware for author
authorSchema.post("findOneAndDelete", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (doc) {
                // Find all books related to the deleted author
                const books = yield book_1.default.find({ author: doc._id });
                // Collect the unique genre IDs from the related books
                const genreIds = [...new Set(books.map((book) => String(book.genre)))];
                // Delete all books related to the author
                yield book_1.default.deleteMany({ author: doc._id });
                // Update the bookCount for each genre
                for (const genreId of genreIds) {
                    const count = yield book_1.default.countDocuments({ genre: genreId });
                    yield genre_1.default.findByIdAndUpdate(genreId, { bookCount: count });
                }
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
const AuthorModel = (0, mongoose_1.model)("author", authorSchema);
exports.default = AuthorModel;
