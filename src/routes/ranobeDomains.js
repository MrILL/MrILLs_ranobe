import Router from 'koa-router';
import Controllers from '../controllers';
import CustomBasicRouter from './CustomBasicRouter';

class RanobeDomainsRouter extends CustomBasicRouter {
  constructor(repos) {
    this.controller = new Controllers(repos);
    this.router = new Router();

    this.router.get('/:ranobe/domains', this.controller.ranobeDomains.get);
    this.router.post('/:ranobe/domains', this.controller.ranobeDomains.create);

    this.router.get(
      '/:ranobe/domains/:domain',
      this.controller.ranobeDomains.getOne
    );
    this.router.put(
      '/:ranobe/domains/:domain',
      this.controller.ranobeDomains.update
    );
    this.router.delete(
      '/:ranobe/domains/:domain',
      this.controller.ranobeDomains.delete
    );
  }
}

export default RanobeDomainsRouter;
