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
exports.updateOrderStatus = exports.getUserOrders = exports.createOrder = exports.getAllOrders = void 0;
const services_1 = require("../../services");
const errors_1 = require("../../errors");
const orders_1 = require("../../validators/orders");
const users_1 = require("../../validators/users");
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services_1.OrdersService.getAllOrders();
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
exports.getAllOrders = getAllOrders;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = orders_1.OrderValidatorSchema.parse(req.body);
        const data = yield services_1.OrdersService.createOrder(body);
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
exports.createOrder = createOrder;
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = users_1.UserIdValidator.parse(req.params);
        const data = yield services_1.OrdersService.getUserOrders(userId);
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
exports.getUserOrders = getUserOrders;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = orders_1.OrderIdValidationSchema.parse(req.params);
        const { status } = orders_1.OrderStatusValidationSchema.parse(req.body);
        const data = yield services_1.OrdersService.updateOrderStatus(orderId, status);
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
exports.updateOrderStatus = updateOrderStatus;
