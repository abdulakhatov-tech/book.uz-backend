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
exports.getRecentlyPublishedBooks = exports.getNewlyArrivedBooks = exports.getNewAgeLibraryBooks = void 0;
const errors_1 = require("../../errors");
const services_1 = require("../../services");
const categoriesService = new services_1.CategoriesService();
const getNewAgeLibraryBooksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield categoriesService.getNewAgeLibraryBooks();
        res.status(200).json({
            status: 'success',
            message: 'ok',
            data: {
                imgUrl: "",
                name: "Yangi Asr Kutubxonasi",
                books,
            }
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.getNewAgeLibraryBooks = getNewAgeLibraryBooksController;
const getNewlyArrivedBooksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield categoriesService.getNewlyArrivedBooks();
        res.status(200).json({
            status: 'success',
            message: 'ok',
            data: {
                imgUrl: "",
                name: "Yangi kelgan kitoblar",
                books,
            }
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.getNewlyArrivedBooks = getNewlyArrivedBooksController;
const getRecentlyPublishedBooksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield categoriesService.getRecentlyPublishedBooks();
        res.status(200).json({
            status: 'success',
            message: 'ok',
            data: {
                imgUrl: "",
                name: "Yangi nashr qilingan kitoblar",
                books,
            }
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.getRecentlyPublishedBooks = getRecentlyPublishedBooksController;
