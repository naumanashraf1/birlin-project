import { NextFunction, Request, Response } from 'express';
import ErrorHandler from './ErrorHandler';

type middleware = (
  res: Request,
  req: Response,
  next: NextFunction
) => Promise<any>;
const CatchAsync = (fn: middleware) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default CatchAsync;
