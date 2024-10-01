"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Token verification middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Token is required',
        });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: 'error',
                message: 'Invalid or expired token',
            });
        }
        // Attaching decoded token to req.user
        if (decoded) {
            req.user = decoded; // Attaching the decoded payload to the request
        }
        next();
    });
};
exports.verifyToken = verifyToken;
