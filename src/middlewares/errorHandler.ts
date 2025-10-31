import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { serverError } from '../utils/response';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  });

  return serverError(res, err.message);
};

