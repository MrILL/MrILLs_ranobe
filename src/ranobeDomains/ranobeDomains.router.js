import validator from 'validator';
import { CustomBasicRouter, errorHandler } from '../utils';

export class RanobeDomainsRouter extends CustomBasicRouter {
  constructor(ranobeDomainsService) {
    super('/ranobes/:ranobe/domains');
    this.service = ranobeDomainsService;

    this.router.post('/', this.create);
    this.router.get('/', this.get);

    this.router.get('/:domain', this.getOne);
    this.router.put('/:domain', this.update);
    this.router.delete('/:domain', this.delete);
  }

  create = async (ctx) => {
    const {
      request: {
        body: { url },
      },
      params: { ranobe },
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
      errorHandler(e, ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 201;
  };

  get = async (ctx) => {
    const {
      params: { ranobe },
    } = ctx;

    let res;
    try {
      res = await this.service.get(ranobe);
    } catch (e) {
      errorHandler(e, ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  };

  getOne = async (ctx) => {
    const {
      params: { ranobe, domain },
    } = ctx;

    let res;
    try {
      res = await this.service.getOne(ranobe, domain);
    } catch (e) {
      errorHandler(e, ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  };

  update = async (ctx) => {
    const {
      params: { ranobe, domain },
    } = ctx;

    let res;
    try {
      res = await this.service.update(ranobe, domain);
    } catch (e) {
      errorHandler(e, ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  };

  delete = async (ctx) => {
    const {
      params: { ranobe, domain },
    } = ctx;

    try {
      await this.service.delete(ranobe, domain);
    } catch (e) {
      errorHandler(e, ctx);
      return;
    }

    ctx.status = 204;
  };
}
