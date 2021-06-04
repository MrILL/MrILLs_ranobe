import Router from 'koa-router';
import Controllers from '../controllers';
import CustomBasicRouter from './utils/CustomBasicRouter';

class ChaptersRouter extends CustomBasicRouter {
  constructor(repos) {
    this.controller = new Controllers(repos).chapters;
    this.router = new Router({
      prefix: '/ranobes/:ranobe/domains/:domain/chapters',
    });

    this.router.get('/', this.controller.get);
    this.router.post('/', this.controller.create);

    this.router.get('/:chapter', this.controller.getOne);
    this.router.put('/:chapter', this.controller.update); //no use of this right now
    this.router.delete('/:chapter', this.controller.delete);
  }
}

export default ChaptersRouter;
