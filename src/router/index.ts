import { Router } from 'express';
import healthCheckRouter from './health-check';
import supermarketRouter from './supermarket';

export default Router().use(healthCheckRouter).use(supermarketRouter);
