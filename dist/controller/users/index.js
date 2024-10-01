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
exports.demoteAdminToUser = exports.promoteUserToAdmin = exports.updateUserById = exports.deleteUserById = exports.getAllUsers = exports.getUserByI = void 0;
const errors_1 = require("../../errors");
const services_1 = require("../../services");
const usersService = new services_1.UsersService();
// user
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield usersService.getAllUsers();
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
exports.getAllUsers = getAllUsersController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        res.status(400).json({
            status: "error",
            message: "Invalid user ID",
        });
    }
    try {
        const data = yield usersService.getUserById(userId);
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
exports.getUserByI = getUserByIdController;
const deleteUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        res.status(400).json({
            status: "error",
            message: "Invalid user ID",
        });
    }
    try {
        const data = yield usersService.deleteUserById(userId);
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
exports.deleteUserById = deleteUserByIdController;
const updateUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const body = req.body;
    if (!userId) {
        res.status(400).json({
            status: "error",
            message: "Invalid user ID",
        });
    }
    try {
        const data = yield usersService.updateUserById(userId, body);
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
exports.updateUserById = updateUserByIdController;
// user promotion
const promoteUserToAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        res.status(400).json({
            status: "error",
            message: "Invalid user ID",
        });
    }
    try {
        const data = yield usersService.promoteUserToAdmin(userId);
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
exports.promoteUserToAdmin = promoteUserToAdminController;
const demoteAdminToUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        res.status(400).json({
            status: "error",
            message: "Invalid user ID",
        });
    }
    try {
        const data = yield usersService.demoteAdminToUser(userId);
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
exports.demoteAdminToUser = demoteAdminToUserController;
