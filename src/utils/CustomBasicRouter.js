import Router from 'koa-router';

export class CustomBasicRouter {
  constructor(prefix) {
    this.router = new Router({ prefix });
  }

  routes() {
    return this.router.routes();
  }

  allowedMethods() {
    return this.router.allowedMethods();
  }
}
