import { PORT } from './configuration/index';
import { Server } from 'http';
import unexpectedErrorHandler from './utils/unexpectedErrorHandler';
import app from './app';
import logger from './utils/logger';

let server: Server;

//Connect to DB first and then create server, run API.
server = app.listen(PORT, () => {
  logger.info('Sever started at port: ' + PORT);
});

process.on('unhandledRejection', (error) =>
  unexpectedErrorHandler(server, error)
);

process.on('uncaughtException', (error) =>
  unexpectedErrorHandler(server, error)
);

process.on('SIGTERM', () => () => {
  logger.info('SIGTERM Received');

  if (server) {
    server.close();
  }
});
