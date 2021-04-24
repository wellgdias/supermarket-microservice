import { Router } from 'express';
import getSupermarket from '../business/rules/get-supermarket';

const supermarketRouter = Router();
supermarketRouter.get('/v1/supermarket', async (req, res, next) => {
  try {
    const response = await getSupermarket();
    res.status(200).json(response);
    return next();
  } catch (error) {
    return next(error);
  }
});

export default supermarketRouter;
