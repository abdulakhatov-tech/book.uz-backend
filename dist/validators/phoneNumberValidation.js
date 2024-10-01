"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePhoneNumber = validatePhoneNumber;
function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(phoneNumber);
}
