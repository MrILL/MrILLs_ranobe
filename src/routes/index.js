import Router from 'koa-router';
import Controllers from '../controllers';
import CustomBasicRouter from './CustomBasicRouter';
import RanobesRouter from './ranobes';
import DomainsRouter from './domains';
import ChaptersRouter from './chapters';

class MyRouter extends CustomBasicRouter {
  constructor(repos) {
    this.controller = new Controllers(repos);
    this.router = new Router({ prefix: '/ranobes' });

    const RouterClasses = [RanobesRouter, DomainsRouter, ChaptersRouter];
    RouterClasses.forEach((rClass) => {
      const route = new rClass(repos);
      this.router.use(route.routes(), route.allowedMethods());
    });
  }
}

export default MyRouter;
