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
const models_1 = require("../../models");
const book_1 = __importDefault(require("../../models/book"));
class AuthorsService {
    constructor() { }
    getAllAuthors(_a) {
        return __awaiter(this, arguments, void 0, function* ({ page, limit, search }) {
            const skip = (page - 1) * limit;
            const searchQuery = search ? { fullName: { $regex: search, $options: "i" } } : {};
            // Total matching books count
            const totalAuthors = yield models_1.AuthorModel.countDocuments(searchQuery);
            // Total pages
            const totalPages = Math.ceil(totalAuthors / limit);
            const authors = yield models_1.AuthorModel.find(searchQuery)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .exec();
            return {
                data: authors,
                totalAuthors,
                totalPages,
            };
        });
    }
    createAuthor(body) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const link = (_a = body.fullName) === null || _a === void 0 ? void 0 : _a.split(" ").join("-").toLowerCase();
            const data = Object.assign(Object.assign({}, body), { link });
            const newAuthor = yield models_1.AuthorModel.create(data);
            if (!newAuthor) {
                throw new Error("Author creation failed!");
            }
            return newAuthor;
        });
    }
    getAuthorById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = yield models_1.AuthorModel.findById(_id).exec();
            if (!author) {
                throw new Error("Author not found!");
            }
            return author;
        });
    }
    updateAuthorById(_id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedAuthor = yield models_1.AuthorModel.findByIdAndUpdate({ _id }, body, {
                new: true,
            }).exec();
            if (!updatedAuthor) {
                throw new Error("Author update failed!");
            }
            return updatedAuthor;
        });
    }
    deleteAuthorById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedAuthor = yield models_1.AuthorModel.findByIdAndDelete({ _id }).exec();
            if (!deletedAuthor) {
                throw new Error("Author not found!");
            }
            return deletedAuthor;
        });
    }
    getAuthorBooks(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = yield models_1.AuthorModel.findById(_id).exec();
            if (!author) {
                throw new Error("Author not found!");
            }
            const books = yield book_1.default.find({ author: _id }).exec();
            return books;
        });
    }
}
exports.default = AuthorsService;
