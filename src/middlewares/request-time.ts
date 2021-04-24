import { RequestHandler } from 'express';

export const setStart: RequestHandler = (req, res, next) => {
  res.locals.startTime = Date.now();
  res.locals.logger.info('TIME:::start', { startTime: res.locals.startTime });

  return next();
};

export const setEnd: RequestHandler = (req, res, next) => {
  res.locals.endTime = Date.now();
  res.locals.logger.info('TIME:::end', { endTime: res.locals.endTime });

  res.locals.logger.info('TIME:::duration', { duration: res.locals.endTime - res.locals.startTime });

  return next();
};
