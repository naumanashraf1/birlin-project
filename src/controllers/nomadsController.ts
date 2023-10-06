import { NextFunction, Request, Response } from 'express';
import User from '../models/authModel';

export const getNomads = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nomId, locations } = req.body;

    let users;

    let query: any = { location: { $nin: [null, undefined] } };

    if (nomId && nomId !== '')
      query = { nomId, location: { $nin: [null, undefined] } };
    else if (locations.includes('all'))
      query = { location: { $nin: [null, undefined] } };
    else
      query = {
        location: { $nin: [null, undefined] },
        city: { $in: locations },
      };

    users = await User.find({ ...query, status: true });

    res.send(users);
  } catch (error) {
    console.log(error);
  }
};
