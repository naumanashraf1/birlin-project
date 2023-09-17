import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
export const tokenGen = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id: id }, String(process.env.SCRET_JWT), {
    expiresIn: String(process.env.JWT_EXPIRES_IN),
  });
};
