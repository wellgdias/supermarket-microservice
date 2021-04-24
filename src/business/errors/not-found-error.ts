import CustomError from './custom-error';

export default class NotFoundError extends CustomError {
  constructor(message: string) {
    super(40, 'NotFoundError', message);
  }
}
