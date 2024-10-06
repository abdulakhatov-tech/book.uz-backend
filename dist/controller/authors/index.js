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
exports.getAuthorBooks = exports.deleteAuthorById = exports.updateAuthorById = exports.getAuthorById = exports.createAuthor = exports.getAllAuthors = void 0;
const errors_1 = require("../../errors");
const services_1 = require("../../services");
const authors_validation_1 = require("../../validators/authors.validation");
const authorsService = new services_1.AuthorsService();
const getAllAuthorsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, search } = authors_validation_1.authorPaginationQuerySchema.parse(req.query);
        const data = yield authorsService.getAllAuthors({
            page,
            limit,
            search: String(search)
        });
        res.status(200).json(Object.assign({ status: "success", message: "ok" }, data));
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.getAllAuthors = getAllAuthorsController;
const createAuthorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = authors_validation_1.createAuthorSchema.parse(req.body);
        const data = yield authorsService.createAuthor(body);
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
exports.createAuthor = createAuthorController;
const getAuthorByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorId } = authors_validation_1.authorIdSchema.parse(req.params);
        const data = yield authorsService.getAuthorById(authorId);
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
exports.getAuthorById = getAuthorByIdController;
const updateAuthorByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorId } = authors_validation_1.authorIdSchema.parse(req.params);
        const body = authors_validation_1.updateAuthorSchema.parse(req.body);
        const data = yield authorsService.updateAuthorById(authorId, body);
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
exports.updateAuthorById = updateAuthorByIdController;
const deleteAuthorByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorId } = authors_validation_1.authorIdSchema.parse(req.params);
        yield authorsService.deleteAuthorById(authorId);
        res.status(204).json({
            status: "success",
            message: "ok",
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.deleteAuthorById = deleteAuthorByIdController;
const getAuthorBooksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorId } = authors_validation_1.authorIdSchema.parse(req.params);
        const data = yield authorsService.getAuthorBooks(authorId);
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
exports.getAuthorBooks = getAuthorBooksController;
