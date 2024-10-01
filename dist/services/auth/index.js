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
const otp_1 = __importDefault(require("./otp"));
const user_1 = __importDefault(require("./user"));
const otpService = new otp_1.default();
const userService = new user_1.default();
class AuthService {
    constructor() {
        this.authType = "sign-in";
    }
    signUp(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.authType = "sign-up";
            const { name, surname, phoneNumber } = body;
            yield userService.checkIfUserExists(phoneNumber);
            const newOtpCode = otpService.generateOTP();
            otpService.storeOTP(phoneNumber, newOtpCode, name, surname);
            return newOtpCode;
        });
    }
    signIn(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.authType = "sign-in";
            const { phoneNumber } = body;
            const isValid = userService.validatePhoneNumber(phoneNumber);
            if (!isValid) {
                throw new Error("Invalid phone number format!");
            }
            yield userService.checkIfUserExists(phoneNumber, false);
            const newOtpCode = otpService.generateOTP();
            otpService.storeOTP(body.phoneNumber, newOtpCode);
            return newOtpCode;
        });
    }
    verifyOTP(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phoneNumber, otpCode } = body;
            const otpData = otpService.validateOTP(phoneNumber, otpCode);
            if (!otpData) {
                throw new Error("Invalid or expired OTP code!");
            }
            return yield userService.createOrUpdateUser(phoneNumber, otpData, this.authType);
        });
    }
}
exports.default = AuthService;
