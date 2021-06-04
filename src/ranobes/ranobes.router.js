import Router from 'koa-router';
import CustomBasicRouter from '../routes/CustomBasicRouter';

export class RanobesRouter extends CustomBasicRouter {
  constructor(ranobesCtrl) {
    this.controller = ranobesCtrl;
    this.router = new Router({ prefix: '/ranobes' });

    this.router.get('/', this.getRanobes); // return array of 'ranobes' with JOIN ranobeDomains (key = id)
    this.router.post('/', this.createRanobe);

    this.router.put('/:ranobe', this.update);
    this.router.delete('/:ranobe', this.delete);
  }

  async getRanobes(ctx) {
    const res = await this.ranobesCtrl.get();
    if (!res) {
      ctx.throw(404, 'Ranobe Not Found');
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  }

  async createRanobe(ctx) {
    const { title } = ctx.request.body;

    const res = await this.ranobesCtrl.add(title);

    ctx.response.body = res;
    ctx.status = 201;
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
      res = await this.ranobesCtrl.update(ranobe, title);
    } catch (e) {
      ctx.throw(404, e);
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
      await this.ranobesRepo.delete(ranobe);
    } catch (e) {
      ctx.throw(404, e);
      return;
    }

    ctx.status = 200;
  }
}

// class RanobesRouter extends CustomBasicRouter {
//   constructor(repos) {
//     this.controller = new Controllers(repos);
//     this.router = new Router();

//     this.router.get('/', this.controller.ranobes.get); // return array of 'ranobes' with JOIN ranobeDomains (key = id)
//     this.router.post('/', this.controller.ranobes.add);

//     this.router.put('/:ranobe', this.controller.ranobes.update);
//     this.router.delete('/:ranobe', this.controller.ranobes.delete);
//   }
// }

export default RanobesRouter;
