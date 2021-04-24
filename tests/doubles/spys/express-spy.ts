/* eslint-disable max-classes-per-file */
export class ResponseSpy {
  statusCode?: number;

  body?: any;

  public locals = {
    logger: {
      info: jest.fn(),
      error: jest.fn(),
      createContext: jest.fn(),
    },
  };

  status(statusCode: number) {
    this.statusCode = statusCode;
    return this;
  }

  json(body: any) {
    this.body = body;
    return this;
  }
}
export class RequestSpy {
  id?: string;

  headers: { [key: string]: string };

  public app = {
    locals: {
      config: {
        application: {
          name: '',
          version: '',
        },
      },
    },
  };

  constructor(headers: { [key: string]: string } = {}) {
    this.headers = headers;
  }

  get(name: string): string | undefined {
    return this.headers[name];
  }
}
