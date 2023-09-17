import { NextFunction, Request, Response } from 'express';

export interface ErrorCheck extends Error {
  status: string;
  statusCode: number;
  isOperation: boolean;
}
const SendResponseDev = (err: ErrorCheck, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    errorStack: err.stack,
  });
};
const SendResponseProd = (err: ErrorCheck, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export const Errors = (
  err: ErrorCheck,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 400;
  if (String(process.env.NODE_ENV).trimEnd() === 'development') {
    return SendResponseDev(err, res);
  }
  if (String(process.env.NODE_ENV).trimEnd() === 'production')
    return SendResponseProd(err, res);
};
