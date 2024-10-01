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
exports.bodyRequirer = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Creating JWT token with expired credentials
const createToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, role } = user;
    const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
    return jsonwebtoken_1.default.sign({ userId: _id, role }, process.env.JWT_SECRET, { expiresIn: maxAge });
});
exports.createToken = createToken;
const bodyRequirer = (_a) => __awaiter(void 0, [_a], void 0, function* ({ body, requiredFields, }) {
    try {
        if (!Array.isArray(requiredFields)) {
            return "Invalid parameter: requiredFields must be an array";
        }
        if (!body || typeof body !== "object") {
            return "Invalid parameter: body is required and must be an object";
        }
        const missingFields = requiredFields.filter((field) => !body[field]);
        if (missingFields.length > 0) {
            return `${missingFields.join(", ")} required!`;
        }
        return null;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        return null;
    }
});
exports.bodyRequirer = bodyRequirer;
