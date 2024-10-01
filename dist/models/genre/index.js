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
const author_1 = __importDefault(require("../author"));
const genreSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    bookCount: {
        type: Number,
        default: 0,
    },
    imgUrl: {
        type: String,
        required: false,
        default: null,
    },
}, { timestamps: true });
// middleware for genre
// Middleware for genre deletion
genreSchema.post("findOneAndDelete", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (doc) {
                // Find all books associated with this genre
                const books = yield book_1.default.find({ genre: doc._id });
                // Collect unique author IDs from the books
                const authorIds = [...new Set(books.map((book) => String(book.author)))];
                // Delete all books related to this genre
                yield book_1.default.deleteMany({ genre: doc._id });
                // Update the bookCount for each author whose books were deleted
                for (const authorId of authorIds) {
                    const count = yield book_1.default.countDocuments({ author: authorId });
                    yield author_1.default.findByIdAndUpdate(authorId, { bookCount: count });
                }
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
const GenreModel = (0, mongoose_1.model)("genre", genreSchema);
exports.default = GenreModel;
