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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
class AuthorsService {
    constructor() { }
    getAllAuthors(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const [authors, total] = yield Promise.all([
                models_1.AuthorModel.find().skip(skip).limit(limit).exec(),
                models_1.AuthorModel.find().exec()
            ]);
            return {
                data: authors,
                total: (total === null || total === void 0 ? void 0 : total.length) || 0
            };
        });
    }
    createAuthor(body) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const link = (_a = body.fullName) === null || _a === void 0 ? void 0 : _a.split(' ').join('-').toLowerCase();
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
            const updatedAuthor = yield models_1.AuthorModel.findByIdAndUpdate({ _id }, body, { new: true }).exec();
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
}
exports.default = AuthorsService;
