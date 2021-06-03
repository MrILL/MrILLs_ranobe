import Router from 'koa-router';
import Controllers from '../controllers';
import CustomBasicRouter from './CustomBasicRouter';

class RanobesRouter extends CustomBasicRouter {
  constructor(repos) {
    this.controller = new Controllers(repos);
    this.router = new Router();

    this.router.get('/', this.controller.ranobes.get); // return array of 'ranobes' with JOIN ranobeDomains (key = id)
    this.router.post('/', this.controller.ranobes.add);

    this.router.put('/:ranobe', this.controller.ranobes.update);
    // this.router.delete('/:ranobe', this.controller.deleteRanobe);
  }
}

export default RanobesRouter;
