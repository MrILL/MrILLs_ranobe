export class HttpException {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }

  throw = (ctx) => {
    ctx.throw(this.statusCode, this.message);
  };
}
