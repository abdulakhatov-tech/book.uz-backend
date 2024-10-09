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
const models_1 = require("../../../models");
const utils_1 = require("../../../utils");
const phoneNumberValidation_1 = require("../../../validators/phoneNumberValidation");
class UserService {
    constructor() {
        this.UserModel = models_1.UserModel;
    }
    checkIfUserExists(phoneNumber_1) {
        return __awaiter(this, arguments, void 0, function* (phoneNumber, shouldExist = true) {
            const user = yield this.UserModel.findOne({ phoneNumber }).exec();
            if (!shouldExist && !user) {
                throw new Error("User not found!");
            }
            else if (shouldExist && user) {
                throw new Error("User with this phone number already exists!");
            }
        });
    }
    validatePhoneNumber(phoneNumber) {
        return (0, phoneNumberValidation_1.validatePhoneNumber)(phoneNumber);
    }
    createOrUpdateUser(phoneNumber_1, _a, authType_1) {
        return __awaiter(this, arguments, void 0, function* (phoneNumber, { name, surname }, authType) {
            const existingUser = yield this.UserModel.findOne({ phoneNumber });
            if (authType === "sign-in") {
                if (existingUser) {
                    existingUser.lastEnteredAt = new Date();
                    existingUser.signInAttempts++;
                    yield existingUser.save();
                    return existingUser;
                }
            }
            if (existingUser) {
                throw new Error("User already exists.");
            }
            let role = "user";
            if (utils_1.ownerPhoneNumbers.includes(phoneNumber)) {
                role = "owner";
            }
            if (utils_1.adminPhoneNumbers.includes(phoneNumber)) {
                role = "admin";
            }
            const newUser = yield this.UserModel.create({
                name,
                surname,
                phoneNumber,
                role,
            });
            newUser.lastEnteredAt = new Date();
            newUser.signInAttempts++;
            yield newUser.save();
            return newUser;
        });
    }
}
exports.default = new UserService;
