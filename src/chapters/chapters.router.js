import Router from 'koa-router';
import validator from 'validator';
import { CustomBasicRouter } from '../utils';

export class ChaptersRouter extends CustomBasicRouter {
  constructor(chaptersService) {
    this.service = chaptersService;

    //TODO move 'domains/:domain' to query and use default if empty
    //right now default is first, that db can give, but need something better
    this.router = new Router({
      prefix: '/ranobes/:ranobe/chapters',
    });

    this.router.post('/', this.create);
    this.router.get('/', this.get);

    this.router.get('/:chapter', this.getOne);
    this.router.put('/:chapter', this.update); //no use of this right now
    this.router.delete('/:chapter', this.delete);
  }

  create = async (ctx) => {
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
      e.throw(ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 201;
  };

  get = async (ctx) => {
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
      e.throw(ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  };

  getOne = async (ctx) => {
    const {
      params: { ranobe, chapter },
      request: {
        query: { domain },
      },
    } = ctx;

    let res;
    try {
      res = await this.service.getOne(ranobe, domain, chapter);
    } catch (e) {
      e.throw(ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  };

  update = async (ctx) => {
    const {
      params: { ranobe, chapter },
      request: {
        query: { domain },
      },
    } = ctx;

    let res;
    try {
      res = await this.service.update(ranobe, domain, chapter);
    } catch (e) {
      e.throw(ctx);
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  };

  delete = async (ctx) => {
    const {
      params: { ranobe, chapter },
      request: {
        query: { domain },
      },
    } = ctx;

    try {
      await this.service.delete(ranobe, domain, chapter);
    } catch (e) {
      e.throw(ctx);
      return;
    }

    ctx.status = 204;
  };
}
