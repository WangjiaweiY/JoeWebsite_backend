import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export const success = <T>(res: Response, data?: T, message?: string) => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
  };
  return res.json(response);
};

export const error = (res: Response, message: string, statusCode = 400) => {
  const response: ApiResponse = {
    success: false,
    error: message,
  };
  return res.status(statusCode).json(response);
};

export const unauthorized = (res: Response, message = 'Unauthorized') => {
  return error(res, message, 401);
};

export const forbidden = (res: Response, message = 'Forbidden') => {
  return error(res, message, 403);
};

export const notFound = (res: Response, message = 'Not found') => {
  return error(res, message, 404);
};

export const serverError = (res: Response, message = 'Internal server error') => {
  return error(res, message, 500);
};

