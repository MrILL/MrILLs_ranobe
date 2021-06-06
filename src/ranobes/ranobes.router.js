import Router from 'koa-router';
import CustomBasicRouter from '../routes/CustomBasicRouter';

export class RanobesRouter extends CustomBasicRouter {
  constructor(ranobesCtrl) {
    this.controller = ranobesCtrl;
    this.router = new Router({ prefix: '/ranobes' });

    this.router.get('/', this.getRanobes);
    this.router.post('/', this.createRanobe);

    this.router.put('/:ranobe', this.update);
    this.router.delete('/:ranobe', this.delete);
  }

  getRanobes = async (ctx) => {
    const res = await this.controller.get();
    if (!res) {
      ctx.throw(404, 'Ranobe Not Found');
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  };

  createRanobe = async (ctx) => {
    const { title } = ctx.request.body;

    const res = await this.controller.add(title);

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
      res = await this.controller.update(ranobe, title);
    } catch (e) {
      ctx.throw(404, e);
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
      await this.ranobesRepo.delete(ranobe);
    } catch (e) {
      ctx.throw(404, e);
      return;
    }

    ctx.status = 200;
  };
}
