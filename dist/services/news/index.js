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
class NewsService {
    constructor() { }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const newsList = yield models_1.NewsModel.find().populate("book");
            return newsList;
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const news = yield models_1.NewsModel.findById({ _id }).populate("book");
            if (!news) {
                throw new Error("News not found");
            }
            return news;
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const news = yield models_1.NewsModel.create(body);
            return news;
        });
    }
    updateById(_id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedNews = yield models_1.NewsModel.findByIdAndUpdate(_id, body, {
                new: true,
            });
            if (!updatedNews) {
                throw new Error("Genre not found");
            }
            return updatedNews;
        });
    }
    deleteById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedNews = yield models_1.NewsModel.findByIdAndDelete(_id);
            if (!deletedNews) {
                throw new Error("News not found");
            }
            return deletedNews;
        });
    }
}
exports.default = NewsService;
