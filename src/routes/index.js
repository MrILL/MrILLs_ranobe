import Router from 'koa-router';
import Controllers from '../controllers';
import CustomBasicRouter from './utils/CustomBasicRouter';
import RanobesRouter from './ranobes';
import RanobeDomainsRouter from './ranobeDomains';
import ChaptersRouter from './chapters';

class MyRouter extends CustomBasicRouter {
  constructor(repos) {
    this.controller = new Controllers(repos);
    this.router = new Router();

    const RouterClasses = [RanobesRouter, RanobeDomainsRouter, ChaptersRouter];
    RouterClasses.forEach((rClass) => {
      const route = new rClass(repos);
      this.router.use(route.routes(), route.allowedMethods());
    });
  }
}

export default MyRouter;
