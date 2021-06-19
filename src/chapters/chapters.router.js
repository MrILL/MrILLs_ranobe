import validator from 'validator';
import { CustomBasicRouter, errorHandler } from '../utils';

export class ChaptersRouter extends CustomBasicRouter {
  constructor(chaptersService) {
    super('/ranobes/:ranobe');
    this.service = chaptersService;

    this.router.post('/chapters', this.create);
    this.router.get('/chapters', this.get);

    const onesPostfix = '/:domain/chapters/:chapter';
    this.router.get(onesPostfix, this.getOne);
    this.router.put(onesPostfix, this.update); //no use of this right now
    this.router.delete(onesPostfix, this.delete);
  }

  async create(ctx) {
    const {
      params: { ranobe },
      request: {
        body: { url },
      },
    } = ctx;

    const validation = validator.isURL(url);
    if (!validation) {
      ctx.throw(400);
      return;
    }

    let res;
    try {
      res = await this.service.create(ranobe, url);
    } catch (e) {
      //TODO intercept err into http exception
      errorHandler(e, ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 201;
  }

  async get(ctx) {
    const {
      params: { ranobe },
      request: {
        query: { domain },
      },
    } = ctx;

    let res;
    try {
      res = await this.service.get(ranobe, domain);
    } catch (e) {
      errorHandler(e, ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  }

  async getOne(ctx) {
    const {
      params: { ranobe, domain, chapter },
    } = ctx;

    let res;
    try {
      res = await this.service.getOne(ranobe, domain, chapter);
    } catch (e) {
      errorHandler(e, ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  }

  async update(ctx) {
    const {
      params: { ranobe, domain, chapter },
    } = ctx;

    let res;
    try {
      res = await this.service.update(ranobe, domain, chapter);
    } catch (e) {
      errorHandler(e, ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  }

  async delete(ctx) {
    const {
      params: { ranobe, domain, chapter },
    } = ctx;

    try {
      await this.service.delete(ranobe, domain, chapter);
    } catch (e) {
      errorHandler(e, ctx);
      return;
    }

    ctx.status = 204;
  }
}
