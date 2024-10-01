import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Token verification middleware
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Token is required',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
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
