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
const book_1 = __importDefault(require("../../models/book"));
const reviews_1 = __importDefault(require("../../models/reviews"));
const reviews_2 = __importDefault(require("../../models/reviews"));
function updateBookRatingAndRateCount(bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const objectIdBookId = typeof bookId === 'string' ? new mongoose_1.Types.ObjectId(bookId) : bookId;
        // Aggregation to calculate the average rating and review count
        const result = yield reviews_1.default.aggregate([
            {
                $match: { book: objectIdBookId }
            },
            {
                $group: {
                    _id: '$book',
                    avgRating: { $avg: '$rating' },
                    reviewCount: { $sum: 1 }
                }
            }
        ]);
        if (result.length > 0) {
            const { avgRating, reviewCount } = result[0];
            yield book_1.default.findByIdAndUpdate(bookId, {
                rating: avgRating,
                rateCount: reviewCount
            });
            return { avgRating, reviewCount };
        }
        else {
            yield book_1.default.findByIdAndUpdate(bookId, {
                rating: 0,
                rateCount: 0
            });
            return { avgRating: 0, reviewCount: 0 };
        }
    });
}
class ReviewsService {
    constructor() { }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield reviews_2.default.create(Object.assign({ user: body === null || body === void 0 ? void 0 : body.userId, book: body === null || body === void 0 ? void 0 : body.bookId }, body));
            if (!review) {
                throw new Error("Failed to create review");
            }
            if (review) {
                yield updateBookRatingAndRateCount(review.book);
            }
            return review;
        });
    }
    getByBookId(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield reviews_2.default.find({ book: new mongoose_1.Types.ObjectId(bookId) })
                .populate("user", "_id imgUrl name surname")
                .exec();
            return reviews;
        });
    }
    updateById(reviewId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield reviews_2.default.findByIdAndUpdate(reviewId, body, {
                new: true,
            }).exec();
            if (!review) {
                throw new Error("Failed to update review");
            }
            if (review) {
                yield updateBookRatingAndRateCount(review.book);
            }
            return review;
        });
    }
    deleteById(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield reviews_2.default.findByIdAndDelete(reviewId).exec();
            if (!review) {
                throw new Error("Failed to delete review");
            }
            if (review) {
                yield updateBookRatingAndRateCount(review.book);
            }
            return review;
        });
    }
}
exports.default = ReviewsService;
