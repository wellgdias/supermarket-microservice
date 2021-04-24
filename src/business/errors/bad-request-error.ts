import CustomError from './custom-error';

export default class BadRequestError extends CustomError {
  constructor(message: string) {
    super(400, 'BadRequestError', message);
  }
}
