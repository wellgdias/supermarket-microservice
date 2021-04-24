import { Request, Response } from 'express';

export const requestSpy = (headers = {}, body = {}, params = {}) => {
  const locals = {};

  const request = {
    headers,
    body,
    params,
    path: '',
    app: { locals },
  };

  return (request as unknown) as Request;
};

export const responseSpy = () => {
  const response = { locals: {} } as Response;
  response.status = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);

  return response;
};
