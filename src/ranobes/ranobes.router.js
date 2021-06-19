import { CustomBasicRouter, errorHandler } from '../utils';

export class RanobesRouter extends CustomBasicRouter {
  constructor(ranobesService) {
    super('/ranobes');
    this.service = ranobesService;

    this.router.post('/', this.create);
    this.router.get('/', this.get);

    this.router.get('/:ranobe', this.getOne);
    this.router.put('/:ranobe', this.update);
    this.router.delete('/:ranobe', this.delete);
  }

  async create(ctx) {
    const { title } = ctx.request.body;

    const res = await this.service.create(title);

    ctx.response.body = res;
    ctx.status = 201;
  }

  async get(ctx) {
    let res;
    try {
      res = await this.service.get();
    } catch (e) {
      errorHandler(e, ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  }

  async getOne(ctx) {
    const {
      params: { ranobe },
    } = ctx;

    let res;
    try {
      res = await this.service.getOne(ranobe);
    } catch (e) {
      errorHandler(e, ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  }

  async update(ctx) {
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
      errorHandler(e, ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  }

  async delete(ctx) {
    const {
      params: { ranobe },
    } = ctx;

    try {
      await this.service.delete(ranobe);
    } catch (e) {
      errorHandler(e, ctx);
      return;
    }

    ctx.status = 204;
  }
}
