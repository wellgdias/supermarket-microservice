import { Request, Response } from 'express';
import router from '../src/router';
import { RequestSpy, ResponseSpy } from './doubles/spys';

jest.mock('express', () => {
  const requestHandlerMock = () => {};
  requestHandlerMock.get = jest.fn();
  requestHandlerMock.post = jest.fn();
  requestHandlerMock.put = jest.fn();
  requestHandlerMock.use = jest.fn().mockReturnValue(requestHandlerMock);

  return {
    Router: () => requestHandlerMock,
  };
});

describe('Routes unit smoke test', () => {
  const makeSut = () => {
    const sut = { router };
    const request = (new RequestSpy() as unknown) as Request;
    const response = (new ResponseSpy() as unknown) as Response;
    const next = jest.fn();

    return {
      sut,
      request,
      response,
      next,
    };
  };

  it('should create routes', async () => {
    const {
      request, response, next, sut,
    } = makeSut();

    const result = sut.router(request, response, next);
    expect(result).toBeUndefined();
  });
});
