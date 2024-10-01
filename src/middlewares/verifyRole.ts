import { TRole } from "../types";
import { Request, Response, NextFunction } from "express";

interface UserPayload {
  id: string;
  role: TRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

// Middleware to check for a specific role
export const verifyRole =
  (requiredRole: TRole) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({
        status: "error",
        message: `Access denied: You must have the '${requiredRole}' role to access this resource.`,
      });
    }
    next();
  };

// Middleware to allow multiple roles
export const verifyRoles =
  (...roles: TRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "error",
        message: `Access denied: You must have one of the following roles: ${roles.join(
          ", "
        )}.`,
      });
    }
    next();
};
