import Router from 'koa-router';
import { CustomBasicRouter } from '../utils';

export class RanobesRouter extends CustomBasicRouter {
  constructor(ranobesService) {
    this.service = ranobesService;
    this.router = new Router({ prefix: '/ranobes' });

    this.router.get('/', this.get);
    this.router.post('/', this.create);

    this.router.put('/:ranobe', this.update);
    this.router.delete('/:ranobe', this.delete);
  }

  get = async (ctx) => {
    let res;
    try {
      res = await this.service.get();
    } catch (e) {
      e.throw(ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  };

  create = async (ctx) => {
    const { title } = ctx.request.body;

    const res = await this.service.add(title);

    ctx.response.body = res;
    ctx.status = 201;
  };

  update = async (ctx) => {
    const {
      request: {
        body: { title },
      },
      params: { ranobe },
    } = ctx;

    let res;
    try {
      res = await this.service.update(ranobe, title);
    } catch (e) {
      e.throw(ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  };

  delete = async (ctx) => {
    const {
      params: { ranobe },
    } = ctx;

    try {
      await this.service.delete(ranobe);
    } catch (e) {
      e.throw(ctx);
      return;
    }

    ctx.status = 204;
  };
}
