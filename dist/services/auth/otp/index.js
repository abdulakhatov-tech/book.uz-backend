"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OTPService {
    constructor() {
        this.otpStore = new Map();
        this.otpValidity = 1 / 2 * 60 * 1000; // 2 minutes
    }
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
    }
    storeOTP(phoneNumber, otpCode, name, surname) {
        const otpData = {
            otpCode,
            expiresAt: Date.now() + this.otpValidity,
        };
        if (name) {
            otpData.name = name;
        }
        if (surname) {
            otpData.surname = surname;
        }
        this.otpStore.set(phoneNumber, otpData);
    }
    validateOTP(phoneNumber, otpCode) {
        const otpEntry = this.otpStore.get(phoneNumber);
        if (!otpEntry) {
            throw new Error("OTP code not found!");
        }
        if (otpEntry.otpCode !== otpCode) {
            throw new Error("Invalid OTP code!");
        }
        if (Date.now() > otpEntry.expiresAt) {
            throw new Error("OTP code expired! Please try again!");
        }
        this.otpStore.delete(phoneNumber);
        return {
            name: otpEntry.name,
            surname: otpEntry.surname,
        };
    }
}
exports.default = OTPService;
