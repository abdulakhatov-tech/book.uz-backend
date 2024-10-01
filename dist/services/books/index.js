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
const book_1 = __importDefault(require("../../models/book"));
class BooksService {
    constructor() { }
    getAllBooks(_a) {
        return __awaiter(this, arguments, void 0, function* ({ page, limit, sort, asc, filters }) {
            const query = {};
            console.log(page, limit, sort, asc, filters);
            // Genre filter
            if (filters.genreIds) {
                if (Array.isArray(filters.genreIds)) {
                    query.genre = { $in: filters.genreIds };
                }
                else {
                    query.genre = filters.genreIds;
                }
            }
            // Price Range filter
            if (filters.fromPrice || filters.toPrice) {
                query.bookPrice = Object.assign(Object.assign({}, (filters.fromPrice && { $gte: filters.fromPrice })), (filters.toPrice && { $lte: filters.toPrice }));
            }
            // Language filter
            if (filters.language) {
                if (Array.isArray(filters.language)) {
                    query.language = { $in: filters.language };
                }
                else {
                    query.language = filters.language;
                }
            }
            // Author filter
            if (filters.authorId) {
                if (Array.isArray(filters.authorIds)) {
                    query.author = { $in: filters.authorIds };
                }
                else {
                    query.author = filters.authorId;
                }
            }
            // Sorting logic
            const sortOptions = {
                createdAt: "createdAt",
                fromPrice: 'bookPrice',
                rating: "rating",
            };
            const sortField = sortOptions[sort] || 'createdAt';
            const sortOrder = asc === "asc" ? 1 : -1;
            const skip = (page - 1) * limit;
            // Total matching books count
            const totalBooks = yield book_1.default.countDocuments(query);
            // Total pages
            const totalPages = Math.ceil(totalBooks / limit);
            // Get books with filters, pagination, and sorting
            const books = yield book_1.default.find(query)
                .populate({
                path: "author",
                select: "_id imgUrl fullName",
            })
                .populate({
                path: "genre",
                select: "_id imgUrl name",
            })
                .sort({ [sortField]: sortOrder })
                .skip(skip)
                .limit(parseInt(limit, 10))
                .exec();
            return {
                books,
                totalBooks,
                totalPages
            };
        });
    }
    createBook(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield book_1.default.create(body);
            if (!book) {
                throw new Error("Failed to create book!");
            }
            return book;
        });
    }
    getBookById(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield book_1.default.findById(bookId)
                .populate({
                path: "author",
                select: "_id imgUrl fullName",
            })
                .populate({
                path: "genre",
                select: "_id imgUrl name",
            })
                .exec();
            if (!book) {
                throw new Error("Book not found!");
            }
            return book;
        });
    }
    updateBookById(bookId, book) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedBook = yield book_1.default.findByIdAndUpdate(bookId, book, {
                new: true,
            }).exec();
            if (!updatedBook) {
                throw new Error("Book update failed!");
            }
            return updatedBook;
        });
    }
    deleteBookById(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBook = yield book_1.default.findByIdAndDelete(bookId).exec();
            if (!deletedBook) {
                throw new Error("Book not found!");
            }
            return deletedBook;
        });
    }
}
exports.default = BooksService;
