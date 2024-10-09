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
class StatisticsService {
    constructor() {
        this.totalNamedBooks = 0;
        this.totalBooks = 0;
        this.totalBranches = 3;
    }
    getStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const totalAmountResult = yield book_1.default.aggregate([
                    { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
                ]);
                this.totalBooks = ((_a = totalAmountResult[0]) === null || _a === void 0 ? void 0 : _a.totalAmount) || 0;
                this.totalNamedBooks = yield book_1.default.countDocuments({
                    name: { $exists: true },
                }).exec();
                return {
                    totalBooks: this.totalBooks,
                    totalNamedBooks: this.totalNamedBooks,
                    totalBranches: this.totalBranches,
                };
            }
            catch (error) {
                throw new Error("Could not retrieve statistics");
            }
        });
    }
}
exports.default = new StatisticsService();
