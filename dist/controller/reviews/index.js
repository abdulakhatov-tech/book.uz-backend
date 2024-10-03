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
exports.deleteById = exports.updateById = exports.getByBookId = exports.create = void 0;
const helpers_1 = require("../../helpers");
const errors_1 = require("../../errors");
const services_1 = require("../../services");
const requiredFields = ["userId", "message"];
const reviewsService = new services_1.ReviewsService();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const body = req.body;
    if (!bookId) {
        res.status(400).json({
            status: "error",
            message: "Invalid book ID",
        });
    }
    const missingFields = yield (0, helpers_1.bodyRequirer)({ body, requiredFields });
    if (missingFields) {
        return res.status(400).json({
            status: "error",
            message: missingFields,
        });
    }
    try {
        const data = yield reviewsService.create(Object.assign({ bookId }, body));
        res.status(201).json({
            status: "success",
            data,
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.create = create;
const getByBookId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    if (!bookId) {
        res.status(400).json({
            status: "error",
            message: "Invalid book ID",
        });
    }
    try {
        const data = yield reviewsService.getByBookId(bookId);
        res.status(200).json({
            status: "success",
            data,
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.getByBookId = getByBookId;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    const body = req.body;
    if (!reviewId) {
        res.status(400).json({
            status: "error",
            message: "Invalid review ID",
        });
    }
    const missingFields = yield (0, helpers_1.bodyRequirer)({ body, requiredFields });
    if (missingFields) {
        return res.status(400).json({
            status: "error",
            message: missingFields,
        });
    }
    try {
        const data = yield reviewsService.updateById(reviewId, body);
        res.status(200).json({
            status: "success",
            data,
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.updateById = updateById;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    if (!reviewId) {
        res.status(400).json({
            status: "error",
            message: "Invalid review ID",
        });
    }
    try {
        yield reviewsService.deleteById(reviewId);
        res.status(204).json({
            status: "success",
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.deleteById = deleteById;
