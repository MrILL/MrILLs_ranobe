import Router from 'koa-router';
import Controllers from '../controllers';
import CustomBasicRouter from '../utils/CustomBasicRouter';

class RanobesRouter extends CustomBasicRouter {
  constructor(repos) {
    this.controller = new Controllers(repos).ranobes;
    this.router = new Router({ prefix: '/ranobes' });

    this.router.get('/', this.controller.get);
    this.router.post('/', this.controller.add);

    this.router.put('/:ranobe', this.controller.update);
    this.router.delete('/:ranobe', this.controller.delete);
  }
}

export default RanobesRouter;
