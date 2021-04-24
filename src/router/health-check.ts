/* eslint-disable prefer-promise-reject-errors */
import { Router, RequestHandler, Request } from 'express';
import { healthServices } from '../helpers/health-services';
import createHealthCheck from '../middlewares/health-check';

const healthCheckRouter = Router();

const getServicesHealth: RequestHandler = async (req, res, next) => {
  // const { config } = req.app.locals;

  req.app.locals.healthServices = await healthServices([
    { name: 'MongoDB Atlas', url: 'https://status.cloud.mongodb.com/' },

  ]);

  return next();
};

const getCollectedHealthResults = (req: Request) => req.app.locals.healthServices;

healthCheckRouter.get('/', getServicesHealth, createHealthCheck(getCollectedHealthResults));

export default healthCheckRouter;
