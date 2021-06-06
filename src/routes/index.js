import Router from 'koa-router';
import CustomBasicRouter from '../utils/CustomBasicRouter';
import { RanobesController, RanobesRepo, RanobesRouter } from '../ranobes';

class MyRouter extends CustomBasicRouter {
  constructor(db) {
    this.routers = [];
    this.router = new Router();

    {
      const repo = new RanobesRepo(db);
      const ctrl = new RanobesController(repo);
      this.routers.push(new RanobesRouter(ctrl));
    }

    this.routers.forEach((route) => {
      this.router.use(route.routes(), route.allowedMethods());
    });
  }
}

export default MyRouter;
