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
exports.deleteById = exports.updateById = exports.create = exports.getAll = void 0;
const errors_1 = require("../../errors");
const services_1 = require("../../services");
const pagination_1 = require("../../validators/pagination");
const banners_1 = require("../../validators/banners");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit } = pagination_1.PaginationQueryValidator.parse(req.query);
        const data = yield services_1.BannersService.getAll({
            page,
            limit
        });
        console.log(data);
        res.status(200).json(Object.assign({ status: "success", message: "ok" }, data));
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.getAll = getAll;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = banners_1.CreateBannerValidator.parse(req.body);
        const data = yield services_1.BannersService.create(body);
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
    try {
        const { bannerId } = banners_1.BannerIdValidator.parse(req.params);
        const body = banners_1.UpdateBannerValidator.parse(req.body);
        const data = yield services_1.BannersService.updateById(bannerId, body);
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
    try {
        const { bannerId } = banners_1.BannerIdValidator.parse(req.params);
        yield services_1.BannersService.deleteById(bannerId);
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
