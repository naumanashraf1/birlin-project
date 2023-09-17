import logger from '../utils/logger';
import connectToDatabase from '../services/mongo.service';

export default async function () {
  try {
    await connectToDatabase();
    logger.info('Database Connected Successfully');
  } catch (error) {
    logger.error(error);
  }
}
