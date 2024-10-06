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
exports.getAllDeliveryMethods = void 0;
const errors_1 = require("../../../errors");
const services_1 = require("../../../services");
const deliveryMethodsService = new services_1.DeliveryMethodsService();
const getAllDeliveryMethods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield deliveryMethodsService.getAllDeliveryMethods();
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
exports.getAllDeliveryMethods = getAllDeliveryMethods;
