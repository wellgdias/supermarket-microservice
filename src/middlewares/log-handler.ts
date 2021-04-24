import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const logRequest: RequestHandler = (req, res, next) => {
  const { logger } = req.app.locals;
  const { path, method } = req;
  const reqId = uuidv4();
  const now = Date.now();
  const device = req.headers['x-device-id'] || 'not-set';
  const context = {
    reqId,
    receivedReqId: req.id,
    req: {
      id: `${reqId}:${now}`,
      device,
      path,
      method,
    },
  };

  const childLogger = logger.createContext(context);

  // TODO: Avaliar uma alternativa para logar objetos request/response
  // childLogger.info({
  //   path, method, headers, params, query, body,
  // }, 'Received request with');

  res.locals.logger = childLogger;
  return next();
};

export const logResponse: RequestHandler = (req, res, next) => {
  res.locals.logger.info('RESPONSE:::status', { res: { status: res.statusCode, message: res.statusMessage } });
  return next();
};
