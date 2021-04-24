export default class CustomError extends Error {
  code: number;

  name: string;

  constructor(code: number, name: string, message: string) {
    super(message);
    this.code = code;
    this.name = name;
  }
}
