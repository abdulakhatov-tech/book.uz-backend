"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const express_1 = require("express");
const verifyToken_1 = require("../../../middlewares/verifyToken");
const verifyRole_1 = require("../../../middlewares/verifyRole");
const upload_1 = require("../../../controller/upload");
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../../../images"));
    },
    filename: (req, file, cb) => {
        cb(null, (0, uuid_1.v4)() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({
    storage,
});
router.post("/", verifyToken_1.verifyToken, (0, verifyRole_1.verifyRoles)("admin", "owner"), upload.single("image"), upload_1.uploadImage);
exports.default = router;
