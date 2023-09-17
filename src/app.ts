import express from 'express';
import configureMiddlwares from './start/middlewares';
import configureDatabase from './start/database';
import configureRoutes from './start/routes';

const app = express();
configureMiddlwares(app);
configureDatabase();
configureRoutes(app);

export default app;
