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
exports.getDiscountByPromocode = void 0;
const errors_1 = require("../../../errors");
const services_1 = require("../../../services");
const promocode_validation_1 = require("../../../validators/promocode.validation");
const promocodeService = new services_1.PromocodeService();
const getDiscountByPromocode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { couponCode } = promocode_validation_1.promocodeSchema.parse(req.body);
        const data = yield promocodeService.getDiscountByPromocode(couponCode);
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
exports.getDiscountByPromocode = getDiscountByPromocode;
