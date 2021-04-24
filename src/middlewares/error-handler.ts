import { ErrorRequestHandler } from 'express';

const customErrorStatus = new Map<string, number>();
customErrorStatus.set('ValidationError', 400);
customErrorStatus.set('ServiceError', 502);
customErrorStatus.set('ForbiddenError', 403);
customErrorStatus.set('NotFoundError', 404);

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  const INTERNAL_ERROR_STATUS = 500;

  if (error.name) {
    const status = customErrorStatus.get(error.name) || INTERNAL_ERROR_STATUS;
    response.status(status).json({ message: error.message });
    return next();
  }

  response.status(INTERNAL_ERROR_STATUS).json({ message: 'Erro interno' });
  return next();
};

export default errorHandler;
