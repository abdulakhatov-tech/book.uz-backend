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
exports.deleteAuthorById = exports.updateAuthorById = exports.getAuthorById = exports.createAuthor = exports.getAllAuthors = void 0;
const errors_1 = require("../../errors");
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const authorsService = new services_1.AuthorsService();
const requiredFields = ['fullName', 'biography'];
const getAllAuthorsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 20 } = req.query;
    // Convert page and limit to numbers and validate them
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid pagination parameters'
        });
    }
    try {
        const data = yield authorsService.getAllAuthors(pageNumber, limitNumber);
        res.status(200).json(Object.assign({ status: 'success', message: 'ok' }, data));
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.getAllAuthors = getAllAuthorsController;
const createAuthorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const missingFields = yield (0, helpers_1.bodyRequirer)({ body, requiredFields });
    if (missingFields) {
        return res.status(400).json({
            status: 'error',
            message: missingFields
        });
    }
    try {
        const data = yield authorsService.createAuthor(body);
        res.status(201).json({
            status: 'success',
            message: 'ok',
            data
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.createAuthor = createAuthorController;
const getAuthorByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorId } = req.params;
    if (!authorId) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid author ID'
        });
    }
    try {
        const data = yield authorsService.getAuthorById(authorId);
        res.status(200).json({
            status: 'success',
            message: 'ok',
            data
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.getAuthorById = getAuthorByIdController;
const updateAuthorByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorId } = req.params;
    const body = req.body;
    if (!authorId) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid author ID'
        });
    }
    const missingFields = yield (0, helpers_1.bodyRequirer)({ body, requiredFields });
    if (missingFields) {
        return res.status(400).json({
            status: 'error',
            message: missingFields
        });
    }
    try {
        const data = yield authorsService.updateAuthorById(authorId, body);
        res.status(200).json({
            status: 'success',
            message: 'ok',
            data
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.updateAuthorById = updateAuthorByIdController;
const deleteAuthorByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorId } = req.params;
    if (!authorId) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid author ID'
        });
    }
    try {
        yield authorsService.deleteAuthorById(authorId);
        res.status(204).json({
            status: 'success',
            message: 'ok'
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.deleteAuthorById = deleteAuthorByIdController;
