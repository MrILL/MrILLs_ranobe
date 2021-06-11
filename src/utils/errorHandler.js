import { HttpException } from './HttpException';

export function errorHandler(err, ctx) {
  switch (err.constructor) {
    case HttpException:
      err.throw(ctx);
      break;
    default:
      console.log(err); //TODO logging
      ctx.status = 500;
  }
}
