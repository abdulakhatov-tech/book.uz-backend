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
exports.uploadImage = void 0;
const promises_1 = __importDefault(require("fs/promises")); // Use promises version of fs
const errors_1 = require("../../errors");
const cloudinaryConfig_1 = __importDefault(require("../../config/cloudinaryConfig"));
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        // Upload the image to Cloudinary
        const result = yield cloudinaryConfig_1.default.uploader.upload(req.file.path, {
            folder: "book-uz",
        });
        // Remove the file from the local filesystem asynchronously
        yield promises_1.default.unlink(req.file.path);
        // Respond with the image URL
        return res.status(200).json({
            message: "success",
            imageUrl: result.secure_url,
        });
    }
    catch (error) {
        return (0, errors_1.apiErrorHandler)(res, error);
    }
});
exports.uploadImage = uploadImage;
