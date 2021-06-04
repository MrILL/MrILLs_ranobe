import Router from 'koa-router';
import Controllers from '../controllers';
import CustomBasicRouter from './CustomBasicRouter';

class ChaptersRouter extends CustomBasicRouter {
  constructor(repos) {
    this.controller = new Controllers(repos);
    this.router = new Router();

    this.router.get(
      '/:ranobe/domains/:domain/chapters',
      this.controller.chapters.get
    );
    this.router.post(
      '/:ranobe/domains/:domain/chapters',
      this.controller.chapters.create
    );

    this.router.get(
      '/:ranobe/domains/:domain/chapters/:chapter',
      this.controller.chapters.getOne
    );
    this.router.put(
      '/:ranobe/domains/:domain/chapters/:chapter',
      this.controller.chapters.update
    ); //no use of this right now
    this.router.delete(
      '/:ranobe/domains/:domain/chapters/:chapter',
      this.controller.chapters.delete
    );
  }
}

export default ChaptersRouter;
