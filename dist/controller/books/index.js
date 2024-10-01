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
exports.getById = exports.deleteById = exports.updateById = exports.create = exports.getAll = void 0;
const errors_1 = require("../../errors");
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const requiredFields = [
    "name",
    "genre",
    "author",
    "amount",
    "bookPrice",
    "language",
    "cover",
    "numberOfPage",
    "state",
    "year",
    "barcode",
    "description",
    "imgUrl",
    "additionalImages",
];
const booksService = new services_1.BooksService();
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 9, genreIds, fromPrice = 0, toPrice = 1000000, language, authorIds, sort = "createdAt", asc = -1, } = req.query;
        const filters = {
            genreIds,
            fromPrice: Number(fromPrice),
            toPrice: Number(toPrice),
            language,
            authorIds,
        };
        const data = yield booksService.getAllBooks({
            page: Number(page),
            limit: Number(limit),
            sort,
            asc: Number(asc),
            filters,
        });
        res.status(200).json({
            status: "success",
            message: "ok",
            data: data.books || [],
            pagination: {
                totalBooks: data.totalBooks,
                totalPages: data.totalPages,
                currentPage: parseInt(page),
            },
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    if (!bookId) {
        return res.status(400).json({
            status: "error",
            message: "Invalid book ID",
        });
    }
    try {
        const data = yield booksService.getBookById(bookId);
        res.status(200).json({
            status: "success",
            message: "ok",
            data,
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.getById = getById;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const missingFields = yield (0, helpers_1.bodyRequirer)({ body, requiredFields });
    if (missingFields) {
        return res.status(400).json({
            status: "error",
            message: missingFields,
        });
    }
    try {
        const data = yield booksService.createBook(body);
        res.status(201).json({
            status: "success",
            message: "ok",
            data,
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.create = create;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const body = req.body;
    const missingFields = yield (0, helpers_1.bodyRequirer)({ body, requiredFields });
    if (missingFields) {
        return res.status(400).json({
            status: "error",
            message: missingFields,
        });
    }
    try {
        const data = yield booksService.updateBookById(bookId, body);
        res.status(200).json({
            status: "success",
            message: "ok",
            data,
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.updateById = updateById;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        yield booksService.deleteBookById(bookId);
        res.status(204).json({
            status: "success",
            message: "ok",
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.deleteById = deleteById;
