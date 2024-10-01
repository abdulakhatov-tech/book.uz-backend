"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsModel = exports.AuthorModel = exports.GenreModel = exports.UserModel = void 0;
var user_1 = require("./user");
Object.defineProperty(exports, "UserModel", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
var genre_1 = require("./genre");
Object.defineProperty(exports, "GenreModel", { enumerable: true, get: function () { return __importDefault(genre_1).default; } });
var author_1 = require("./author");
Object.defineProperty(exports, "AuthorModel", { enumerable: true, get: function () { return __importDefault(author_1).default; } });
var news_1 = require("./news");
Object.defineProperty(exports, "NewsModel", { enumerable: true, get: function () { return __importDefault(news_1).default; } });
