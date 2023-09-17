import logger from './logger';
import { Server } from 'http';

export default (server: Server, error: any) => {
  return () => {
    logger.error('Unhandle/uncaught rejection: ', error.message);

    if (server) {
      server.close(() => {
        logger.info('Server closed: ', error);
        process.exit(1);
      });
    } else {
      logger.info('Server closed: ', error);
      process.exit(1);
    }
  };
};
