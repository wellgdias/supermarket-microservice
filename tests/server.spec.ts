import faker from 'faker';
import * as server from '../src';

jest.mock('../src/config', () => () => ({
  logger: {
    name: 'logFake',
    level: 'info',
  },
}));

jest.mock('../src/middlewares/error-handler', () => jest.fn());
jest.mock('../src/middlewares/log-handler');
jest.mock('../src/router', () => jest.fn());

jest.mock('express-request-id', () => () => jest.fn());
jest.mock('cors', () => () => jest.fn());
jest.mock('swagger-ui-express', () => ({
  serve: jest.fn(),
  setup: () => jest.fn(),
}));
jest.mock('express-openapi-validator', () => ({
  middleware: () => jest.fn(),
}));

jest.mock('express', () => {
  const reqDummy = {
    app: {
      locals: {},
    },
  };
  const resFake = {
    send: jest.fn(),
    locals: {},
  };

  const expressMock = () => ({
    use: jest.fn((middleware) => middleware),
    listen: jest.fn((port, listener) => listener()),
    get: jest.fn((path, handler) => handler(reqDummy, resFake)),
    set: jest.fn(),
    locals: {},
  });

  expressMock.json = jest.fn(() => jest.fn(() => jest.fn()));

  return expressMock;
});

describe.only('Server application', () => {
  const makeSut = () => {
    const sut = { startServer: server.start };

    return {
      sut,
    };
  };

  it('Should start server', async () => {
    const { sut } = makeSut();

    const port = 8081;
    const mongoUri = faker.internet.url();
    expect(await sut.startServer(port, mongoUri)).toBeUndefined();
  });
});
