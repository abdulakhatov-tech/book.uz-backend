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
exports.promoteUserToAdmin = exports.demoteAdminToUser = exports.updateById = exports.deleteById = exports.getById = exports.getAll = void 0;
const users_1 = require("../../validators/users");
const services_1 = require("../../services");
const errors_1 = require("../../errors");
const pagination_1 = require("../../validators/pagination");
// get all users
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, search } = pagination_1.PaginationQueryValidator.parse(req.query);
        const data = yield services_1.UsersService.getAllUsers({
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
exports.getAll = getAll;
// get user by id
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate userId in req.params
        const { userId } = users_1.UserIdValidator.parse(req.params);
        const data = yield services_1.UsersService.getUserById(userId);
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
// delete user by id
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate userId in req.params
        const { userId } = users_1.UserIdValidator.parse(req.params);
        yield services_1.UsersService.deleteUserById(userId);
        res.status(200).json({
            status: "success",
            message: "ok",
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.deleteById = deleteById;
// update user by id
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate userId and body in req
        const { userId } = users_1.UserIdValidator.parse(req.params);
        const body = users_1.UpdateUserBodyValidator.parse(req.body);
        const data = yield services_1.UsersService.updateUserById(userId, body);
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
// user promotion
const promoteUserToAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate userId in req.params
        const { userId } = users_1.UserIdValidator.parse(req.params);
        const data = yield services_1.UsersService.promoteUserToAdmin(userId);
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
exports.promoteUserToAdmin = promoteUserToAdmin;
// admin demotion
const demoteAdminToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate userId in req.params
        const { userId } = users_1.UserIdValidator.parse(req.params);
        const data = yield services_1.UsersService.demoteAdminToUser(userId);
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
exports.demoteAdminToUser = demoteAdminToUser;
