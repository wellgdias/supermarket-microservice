import { Router } from 'express';
import getSupermarket from '../business/rules/get-supermarket';

const supermarketRouter = Router();
supermarketRouter.get('/v1/supermarkets/:cep', async (req, res, next) => {
  const { cep } = req.params;
  const {
    config: {
      services: {
        cep: { url, token },
      },
    },
  } = res.app.locals;

  try {
    const response = await getSupermarket(cep, url, token);
    res.status(200).json(response);
    return next();
  } catch (error) {
    return next(error);
  }
});

export default supermarketRouter;
