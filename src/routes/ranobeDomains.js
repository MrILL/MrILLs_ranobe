import Router from 'koa-router';
import Controllers from '../controllers';
import CustomBasicRouter from './utils/CustomBasicRouter';

class RanobeDomainsRouter extends CustomBasicRouter {
  constructor(repos) {
    this.controller = new Controllers(repos).ranobeDomains;
    this.router = new Router({ prefix: '/ranobes/:ranobe/domains' });

    this.router.get('/', this.controller.get);
    this.router.post('/', this.controller.create);

    this.router.get('/:domain', this.controller.getOne);
    this.router.put('/:domain', this.controller.update);
    this.router.delete('/:domain', this.controller.delete);
  }
}

export default RanobeDomainsRouter;
