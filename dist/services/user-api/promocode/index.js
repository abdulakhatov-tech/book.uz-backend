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
const models_1 = require("../../../models");
class PromocodeService {
    constructor() { }
    getDiscountByPromocode(couponCode) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield models_1.PromocodeModel.findOne({ couponCode })
                .select("discount -_id")
                .exec();
            if (!result) {
                throw new Error("Invalid coupon code!");
            }
            return {
                discount: result === null || result === void 0 ? void 0 : result.discount,
                message: `Couponcode applied successfully. <strong>${(_a = result === null || result === void 0 ? void 0 : result.discount) !== null && _a !== void 0 ? _a : 0}%</strong> discount has been applied to your total amount.`,
            };
        });
    }
}
exports.default = PromocodeService;
