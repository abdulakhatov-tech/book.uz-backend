"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRoles = exports.verifyRole = void 0;
// Middleware to check for a specific role
const verifyRole = (requiredRole) => (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).json({
            status: "error",
            message: `Access denied: You must have the '${requiredRole}' role to access this resource.`,
        });
    }
    next();
};
exports.verifyRole = verifyRole;
// Middleware to allow multiple roles
const verifyRoles = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({
            status: "error",
            message: `Access denied: You must have one of the following roles: ${roles.join(", ")}.`,
        });
    }
    next();
};
exports.verifyRoles = verifyRoles;
