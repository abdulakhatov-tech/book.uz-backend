"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = exports.ReviewsService = exports.AuthorsService = exports.GenresService = exports.OTPService = exports.BooksService = exports.UsersService = exports.AuthService = exports.NewsService = void 0;
var news_1 = require("./news");
Object.defineProperty(exports, "NewsService", { enumerable: true, get: function () { return __importDefault(news_1).default; } });
var auth_1 = require("./auth");
Object.defineProperty(exports, "AuthService", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
var users_1 = require("./users");
Object.defineProperty(exports, "UsersService", { enumerable: true, get: function () { return __importDefault(users_1).default; } });
var books_1 = require("./books");
Object.defineProperty(exports, "BooksService", { enumerable: true, get: function () { return __importDefault(books_1).default; } });
var otp_1 = require("./auth/otp");
Object.defineProperty(exports, "OTPService", { enumerable: true, get: function () { return __importDefault(otp_1).default; } });
var genres_1 = require("./genres");
Object.defineProperty(exports, "GenresService", { enumerable: true, get: function () { return __importDefault(genres_1).default; } });
var authors_1 = require("./authors");
Object.defineProperty(exports, "AuthorsService", { enumerable: true, get: function () { return __importDefault(authors_1).default; } });
var reviews_1 = require("./reviews");
Object.defineProperty(exports, "ReviewsService", { enumerable: true, get: function () { return __importDefault(reviews_1).default; } });
var categories_1 = require("./categories");
Object.defineProperty(exports, "CategoriesService", { enumerable: true, get: function () { return __importDefault(categories_1).default; } });
