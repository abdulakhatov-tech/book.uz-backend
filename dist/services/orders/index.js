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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../../models/order"));
class OrdersService {
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_1.default.find()
                .populate("user")
                .populate({
                path: 'books.book', // Populating the book field inside the books array
                model: 'book',
            })
                .populate({
                path: 'billingAddress.region',
                model: 'region',
            })
                .populate({
                path: 'billingAddress.district',
                model: 'district',
            });
            if (!orders) {
                throw new Error("Failed to fetch orders");
            }
            return orders;
        });
    }
    createOrder(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_1.default.create(body);
            if (!order) {
                throw new Error("Failed to create order");
            }
            return order;
        });
    }
    getUserOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_1.default.find({ user: userId });
            if (!orders) {
                throw new Error("Failed to fetch user orders");
            }
            return orders;
        });
    }
    updateOrderStatus(orderId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedOrder = yield order_1.default.findByIdAndUpdate(orderId, { status }, { new: true });
            if (!updatedOrder) {
                throw new Error("Failed to update order status");
            }
            return updatedOrder;
        });
    }
}
exports.default = new OrdersService();
