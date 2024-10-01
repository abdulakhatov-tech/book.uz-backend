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
class CategoriesService {
    constructor() { }
    getNewAgeLibraryBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            // Calculate the current year minus 100 years
            const hundredYearsAgo = new Date().getFullYear() - 100;
            // Books published in the New Age category
            const books = yield book_1.default.find({ year: { $gte: hundredYearsAgo } })
                .sort({ year: -1 })
                .select("amount author bookPrice discount hasDiscount imgUrl name rateCount rating state _id additionalImages")
                .populate("author", "_id fullName")
                .limit(12)
                .exec();
            if (!books.length) {
                throw new Error("No New Age books found!");
            }
            return books;
        });
    }
    getNewlyArrivedBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            const pastDate = new Date(today.setDate(today.getDate() - 30));
            // Books added in the last 30 days
            const books = yield book_1.default.find({ createdAt: { $gte: pastDate } })
                .sort({ createdAt: -1 })
                .select("amount author bookPrice discount hasDiscount imgUrl name rateCount rating state _id additionalImages")
                .populate("author", "_id fullName")
                .limit(8)
                .exec();
            if (!books.length) {
                throw new Error("No new books found!");
            }
            return books;
        });
    }
    getRecentlyPublishedBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            // Books published in the last 12 months of the year
            const books = yield book_1.default.find()
                .sort({ year: -1 })
                .select("amount author bookPrice discount hasDiscount imgUrl name rateCount rating state _id additionalImages")
                .populate("author", "_id fullName")
                .limit(8)
                .exec();
            if (!books.length) {
                throw new Error("No recently published books found!");
            }
            return books;
        });
    }
}
exports.default = CategoriesService;
