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
exports.deleteById = exports.updateById = exports.getById = exports.getAll = exports.create = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const errors_1 = require("../../errors");
const news_validation_1 = require("../../validators/news.validation");
const requiredFields = ["title", "imgUrl", "type", "content"];
const newsService = new services_1.NewsService();
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, type } = news_validation_1.newsQuerySchema.parse(req.query);
        const { data, totalPages, totalNews } = yield newsService.getAll({
            page,
            limit,
            type,
        });
        res.status(200).json({
            status: "success",
            message: "ok",
            data,
            totalPages,
            totalNews,
        });
    }
    catch (err) {
        return (0, errors_1.apiErrorHandler)(res, err);
    }
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newsId } = req.params;
    if (!newsId) {
        return res.status(400).json({
            status: "error",
            message: "Invalid news ID",
        });
    }
    try {
        const data = yield newsService.getById(newsId);
        res.status(200).json({
            status: "success",
            message: "ok",
            data,
        });
    }
    catch (err) {
        return (0, errors_1.apiErrorHandler)(res, err);
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
    const { type, book } = body;
    if (type === "newBook" && !book) {
        return res.status(400).json({
            status: "error",
            message: "New book announcements must include a book reference",
        });
    }
    try {
        const data = yield newsService.create(body);
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
    const { newsId } = req.params;
    const body = req.body;
    if (!newsId) {
        return res.status(400).json({
            status: "error",
            message: "Invalid news ID",
        });
    }
    const { type, book } = body;
    if (type === "newBook" && !book) {
        return res.status(400).json({
            status: "error",
            message: "New book announcements must include a book reference",
        });
    }
    // Checking for missing required fields using the bodyRequirer helper
    const missingFields = yield (0, helpers_1.bodyRequirer)({ body, requiredFields });
    // If there are missing fields, respond with a 400 error
    if (missingFields) {
        return res.status(400).json({
            status: "error",
            message: missingFields,
        });
    }
    try {
        const data = yield newsService.updateById(newsId, body);
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
    const { newsId } = req.params;
    if (!newsId) {
        return res.status(400).json({
            status: "error",
            message: "Invalid news ID",
        });
    }
    try {
        const data = yield newsService.deleteById(newsId);
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
exports.deleteById = deleteById;
