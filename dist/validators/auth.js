"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPVerificationValidator = exports.SignUpValidator = exports.PhoneNumberValidator = void 0;
const zod_1 = require("zod");
// PhoneNumberValidator for validating phone numbers
exports.PhoneNumberValidator = zod_1.z.object({
    phoneNumber: zod_1.z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format" })
        .nonempty({ message: "Phone number is required" }),
});
// SignUpValidator for validating user sign-up details
exports.SignUpValidator = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }).trim(),
    surname: zod_1.z.string().min(1, { message: "Surname is required" }).trim(),
    phoneNumber: exports.PhoneNumberValidator.shape.phoneNumber,
});
// OTPVerificationValidator for validating OTP verification
exports.OTPVerificationValidator = zod_1.z.object({
    phoneNumber: exports.PhoneNumberValidator.shape.phoneNumber,
    otpCode: zod_1.z.number().min(1, { message: "OTP code is required" }),
});
