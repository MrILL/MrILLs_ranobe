import Router from 'koa-router';
import Controllers from '../controllers';
import CustomBasicRouter from './CustomBasicRouter';

class RanobesRouter extends CustomBasicRouter {
  constructor(repos) {
    this.controller = new Controllers(repos);
    this.router = new Router();

    this.router.get('/', this.controller.getRanobes); // return array of 'ranobes' with JOIN ranobeDomains (key = id)
    this.router.post('/', this.controller.addRanobe); //

    // this.router.put('/:ranobe', this.controller.updateRanobe); //update one 'ranobes'
    // this.router.delete('/:ranobe', this.controller.deleteRanobe); //delete one 'ranobes'
  }
}

export default RanobesRouter;
