import { NextFunction, Request, Response } from 'express';
import CatchAsync from '../utils/CatchAsync';
import User from '../models/authModel';
import { tokenGen } from '../utils/GenrateToken';
import ErrorHandler from '../utils/ErrorHandler';

export const register = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = new User(req.body);
    const token = tokenGen(user._id);
    await user.save();
    res.send({ ...user.toObject(), token });
  }
);
export const login = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler('please insert credentials', 400));
    }
    const user = await User.findOne({ email: req?.body?.email }).select(
      '+password'
    );
    if (!user) {
      return next(new ErrorHandler('User does not exists', 400));
    }
    const passwordVerify = await user.correctPassword(
      req.body.password,
      String(user.password)
    );
    if (!passwordVerify || !passwordVerify) {
      return next(new ErrorHandler('Credentials are not correct', 400));
    }
    const token = tokenGen(user._id);
    res.send(token);
  }
);
