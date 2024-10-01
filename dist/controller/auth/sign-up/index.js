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
const helpers_1 = require("../../../helpers");
const errors_1 = require("../../../errors");
const services_1 = require("../../../services");
// services
const authService = new services_1.AuthService();
const otpService = new services_1.OTPService();
// Defining the required fields for the sign-up request
const requiredFields = ["name", "surname", "phoneNumber"];
const signUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // Check for missing required fields using the bodyRequirer helper
    const missingFields = yield (0, helpers_1.bodyRequirer)({ body, requiredFields });
    // If there are missing fields, respond with a 400 error
    if (missingFields) {
        return res.status(400).json({
            status: "error",
            message: missingFields,
        });
    }
    try {
        // Calling the signUp method from AuthService to handle the registration process
        const otpCode = yield authService.signUp(body);
        res.status(200).json({
            status: "success",
            message: "ok",
            extraMessage: "Verification code sent successfully",
            activeOtpTime: otpService.otpValidity,
            otpCode,
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.default = signUpController;
