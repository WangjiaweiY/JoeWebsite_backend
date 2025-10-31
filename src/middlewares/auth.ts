import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt';
import { unauthorized } from '../utils/response';

// 扩展 Express Request 类型
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return unauthorized(res, 'No token provided');
    }

    const token = authHeader.replace('Bearer ', '');
    
    if (!token) {
      return unauthorized(res, 'Invalid token format');
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    
    next();
  } catch (error) {
    return unauthorized(res, 'Invalid or expired token');
  }
};

