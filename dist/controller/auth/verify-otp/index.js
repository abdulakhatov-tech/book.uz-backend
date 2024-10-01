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
exports.requiredFields = void 0;
const services_1 = require("../../../services");
const helpers_1 = require("../../../helpers");
const authService = new services_1.AuthService();
exports.requiredFields = ["phoneNumber", "otpCode"];
const verifyOTPController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // Check for missing fields
        const missingFields = yield (0, helpers_1.bodyRequirer)({ body, requiredFields: exports.requiredFields });
        if (missingFields) {
            return res.status(400).json({
                status: "error",
                message: `Missing fields: ${missingFields}`,
            });
        }
        // Verify OTP
        const user = yield authService.verifyOTP(body);
        // Create JWT token for the user
        const token = yield (0, helpers_1.createToken)(user);
        // Respond with success
        return res.status(201).json({
            status: "success",
            message: "OTP verified successfully",
            data: {
                token,
                user,
            },
        });
    }
    catch (error) {
        // Handle any errors
        return res.status(400).json({
            status: "error",
            message: error.message || "An error occurred during OTP verification",
        });
    }
});
exports.default = verifyOTPController;
