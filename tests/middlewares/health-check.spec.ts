import { Request, Response } from 'express';
import healthCheckMiddleware from '../../src/middlewares/health-check';
import { RequestSpy, ResponseSpy } from '../doubles/spys';

describe('Health check middleware unit tests', () => {
  const makeSut = () => {
    const request = (new RequestSpy() as unknown) as Request;
    const response = (new ResponseSpy() as unknown) as Response;
    const next = jest.fn();
    const sut = healthCheckMiddleware;

    return {
      sut,
      request,
      response,
      next,
    };
  };

  it('should send a OK status if application is healthy', async () => {
    const {
      sut, request, response, next,
    } = makeSut();

    const checkService = () => ({
      name: 'fake-service',
      result: true,
    });

    await sut(checkService)(request, response, next);

    expect(response.statusCode).toBe(200);
  });
  it('should send a OK status if if all services is healthy', async () => {
    const {
      sut, request, response, next,
    } = makeSut();

    const checkService = () => [
      {
        name: 'fake-service',
        result: true,
      },
      {
        name: 'fake-service-2',
        result: true,
      },
    ];

    await sut(checkService)(request, response, next);

    expect(response.statusCode).toBe(200);
  });

  it('should send service unavailable status (503) if application is NOT healthy', async () => {
    const {
      sut, request, response, next,
    } = makeSut();

    const checkService = () => ({
      name: 'fake-service',
      result: false,
    });

    await sut(checkService)(request, response, next);

    expect(response.statusCode).toBe(503);
  });
});
