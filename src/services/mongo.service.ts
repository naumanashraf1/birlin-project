import mongoose from 'mongoose';
import { MONGO_URL } from '../configuration';

/**
 * Connects mongoose to MongoDB and returns mongoose instance
 * @returns {Promise} mongoose instance to connect
 */
const connectToDatabase = (): Promise<typeof mongoose> => {
  return mongoose.connect(MONGO_URL, {
    autoIndex: true,
  });
};

export default connectToDatabase;
