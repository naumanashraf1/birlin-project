import { Request, Response, Application } from 'express';
import ErrorHandler from '../utils/ErrorHandler';
import { Errors } from '../middlewares';
import { qrRouter, usersRouter } from '../routes/index';

export default function (app: Application) {
  // Route Handlers
  app.use('/api/v1', usersRouter.default);
  app.use('/api/v1', qrRouter.default);

  app.use('/*', (req, res, next) => {
    next(new ErrorHandler('the route is not present', 400));
  });
  app.use(Errors);
}
