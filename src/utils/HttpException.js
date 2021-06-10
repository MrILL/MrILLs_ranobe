export class HttpException {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }

  throw = (ctx) => {
    ctx.statusCode = this.statusCode;
    ctx.response.body = {
      success: false,
      error: {
        message: this.message,
      },
    };
  };
}
