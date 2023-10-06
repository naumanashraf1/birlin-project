import { model, Schema } from 'mongoose';
import { CITY, User } from '../types/interfaces';
import bcrypt from 'bcryptjs';

const userSchema = new Schema<User>({
  name: {
    type: String,
    maxlength: 50,
  },
  status: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, 'please enter a password'],
    select: false,
  },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  city: {
    type: String,
  },
  nomId: {
    type: String,
  },
  experience: {
    type: String,
  },
  foundDetail: {
    type: String,
  },
  alias: {
    type: String,
  },
});
userSchema.index({ location: '2dsphere' });
userSchema.set('toObject', {
  transform: function (doc, ret, opt) {
    delete ret['password'];
    return ret;
  },
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const hashed: string = await bcrypt.hash(this?.password.toString(), 8);
  this.password = hashed;
});
userSchema.methods.correctPassword = async function (
  candidate: string,
  hashed: string
) {
  return await bcrypt.compare(candidate, hashed);
};
const User = model<User>('User', userSchema, 'users');

export default User;
