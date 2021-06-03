import Router from 'koa-router';
import Controllers from '../controllers';
import CustomBasicRouter from './CustomBasicRouter';

class RanobeDomainsRouter extends CustomBasicRouter {
  constructor(repos) {
    this.controller = new Controllers(repos);
    this.router = new Router();

    // this.router.get('/:ranobe/domains', this.controller.getRanobeDomains);
    // this.router.post('/:ranobe/domains', this.controller.addRanobeDomain);

    // this.router.get('/:ranobe/domains/:domain', this.controller.getRanobeDomain);
    // this.router.put('/:ranobe/domains/:domain', this.controller.updateRanobeDomain);
    // this.router.delete('/:ranobe/domains/:domain', this.controller.deleteRanobeDomain);
  }
}

export default RanobeDomainsRouter;
