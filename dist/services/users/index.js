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
const models_1 = require("../../models");
class UsersService {
    constructor() { }
    getAllUsers(_a) {
        return __awaiter(this, arguments, void 0, function* ({ page, limit, search, }) {
            const skip = (page - 1) * limit;
            const searchQuery = search
                ? { name: { $regex: search, $options: "i" } }
                : {};
            // Total matching users count
            const totalUsers = yield models_1.UserModel.countDocuments(searchQuery);
            // Total pages
            const totalPages = Math.ceil(totalUsers / limit);
            const users = yield models_1.UserModel.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .exec();
            return {
                data: users,
                totalUsers,
                totalPages,
            };
        });
    }
    getUserById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.UserModel.findById({ _id }).exec();
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        });
    }
    deleteUserById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.UserModel.findByIdAndDelete({ _id }).exec();
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        });
    }
    updateUserById(_id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield models_1.UserModel.findByIdAndUpdate({ _id }, Object.assign({}, user), { new: true }).exec();
            if (!updatedUser) {
                throw new Error("User update failed!");
            }
            return updatedUser;
        });
    }
    promoteUserToAdmin(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.UserModel.findById({ _id });
            if (!user) {
                throw new Error("User not found");
            }
            if (user.role == "admin" || user.role == "owner") {
                throw new Error(`User is already an ${user.role}.`);
            }
            user.role = "admin";
            yield user.save();
            return user;
        });
    }
    demoteAdminToUser(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.UserModel.findById({ _id });
            if (!user) {
                throw new Error("User not found");
            }
            if (user.role === "user") {
                throw new Error("User is already a regular user.");
            }
            user.role = "user";
            yield user.save();
            return user;
        });
    }
}
exports.default = new UsersService();
