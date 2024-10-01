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
const errors_1 = require("../../errors");
const services_1 = require("../../services");
const genresService = new services_1.GenresService();
const requiredFields = ["name"];
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield genresService.getAll();
        res.status(200).json({
            status: "success",
            message: "ok",
            data
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { genreId } = req.params;
    if (!genreId) {
        return res.status(400).json({
            status: "error",
            message: "Invalid genre ID",
        });
    }
    try {
        const data = yield genresService.getById(genreId);
        res.status(200).json({
            status: "success",
            message: "ok",
            data
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.getById = getById;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
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
        const data = yield genresService.create(body);
        res.status(201).json({
            status: "success",
            message: "ok",
            data
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.create = create;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { genreId } = req.params;
    const body = req.body;
    if (!genreId) {
        return res.status(400).json({
            status: "error",
            message: "Invalid genre ID",
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
        const data = yield genresService.updateById(genreId, body);
        res.status(200).json({
            status: "success",
            message: "ok",
            data
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.updateById = updateById;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { genreId } = req.params;
    if (!genreId) {
        return res.status(400).json({
            status: "error",
            message: "Invalid genre ID",
        });
    }
    try {
        const data = yield genresService.deleteById(genreId);
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
