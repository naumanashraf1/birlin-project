import { NextFunction, Request, Response } from 'express';
import ShortUniqueId from 'short-unique-id';
import CatchAsync from '../utils/CatchAsync';
import User from '../models/authModel';
import { tokenGen } from '../utils/GenrateToken';
import ErrorHandler from '../utils/ErrorHandler';
import axios from 'axios';
import { GOOGLE_API_KEY } from '../configuration';
import { CITY } from '../types/interfaces';

const { randomUUID } = new ShortUniqueId({ length: 5 });

export const register = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let data;
    try {
      data = await axios(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.location.lat},${req.body.location.lng}&key=${GOOGLE_API_KEY}`
      );
    } catch (err) {}

    let city: CITY = 'Other';

    if (data?.data?.plus_code?.compound_code?.includes('Berlin'))
      city = 'Berlin';
    if (data?.data?.plus_code?.compound_code?.includes('New Delhi'))
      city = 'New Delhi';

    const user = new User(req.body);
    const token = tokenGen(user._id);

    user.nomId = randomUUID();
    user.city = city;

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
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.find({
    $or: [
      { status: false }, // Matches documents where status is false
      { status: { $exists: false } }, // Matches documents where status doesn't exist
    ],
  });

  res.send(users);
};
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.send('user deleted');
};
export const ApproveUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.updateOne(
    {
      _id: req.params.id,
    },
    {
      status: true,
    }
  );
  res.send('user updated');
};
