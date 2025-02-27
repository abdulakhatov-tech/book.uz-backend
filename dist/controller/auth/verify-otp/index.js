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
const services_1 = require("../../../services");
const errors_1 = require("../../../errors");
const auth_1 = require("../../../validators/auth");
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate and parse the request body
        const body = auth_1.OTPVerificationValidator.parse(req.body);
        // Verify OTP
        const user = yield services_1.AuthService.verifyOTP(body);
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
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.default = verifyOTP;
