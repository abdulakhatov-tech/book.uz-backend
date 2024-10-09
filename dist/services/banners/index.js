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
class BannersService {
    constructor() { }
    getAll(_a) {
        return __awaiter(this, arguments, void 0, function* ({ page, limit, search }) {
            const skip = (page - 1) * limit;
            const searchQuery = search
                ? { title: { $regex: search, $options: "i" } }
                : {};
            // Total matching users count
            const totalUsers = yield models_1.BannerModel.countDocuments(searchQuery);
            // Total pages
            const totalPages = Math.ceil(totalUsers / limit);
            const banners = yield models_1.BannerModel.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .exec();
            return {
                data: banners,
                totalUsers,
                totalPages,
            };
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBanner = yield models_1.BannerModel.create(body);
            if (!newBanner) {
                throw new Error("Failed to create banner!");
            }
            return newBanner;
        });
    }
    updateById(_id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedBanner = yield models_1.BannerModel.findByIdAndUpdate(_id, body, {
                new: true,
            });
            if (!updatedBanner) {
                throw new Error("Failed to update banner!");
            }
            return updatedBanner;
        });
    }
    deleteById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBanner = yield models_1.BannerModel.findByIdAndDelete(_id);
            if (!deletedBanner) {
                throw new Error("Failed to delete banner!");
            }
            return deletedBanner;
        });
    }
}
exports.default = new BannersService();
