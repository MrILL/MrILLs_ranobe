import Router from 'koa-router';
import Controllers from '../controllers';
import CustomBasicRouter from './CustomBasicRouter';

class ChaptersRouter extends CustomBasicRouter {
  constructor(repos) {
    this.controller = new Controllers(repos);
    this.router = new Router();

    // this.router.get('/:ranobe/domains/:domain/chapters', this.controller.getChapters);
    // this.router.post('/:ranobe/domains/:domain/chapters', this.controller.addChapters);

    // this.router.get('/:ranobe/domains/:domain/chapters/:chapter', this.controller.getChapter);
    // this.router.put('/:ranobe/domains/:domain/chapters/:chapter', this.controller.updateChapter);
    // this.router.delete('/:ranobe/domains/:domain/chapters/:chapter', this.controller.deleteChapter);
  }
}

export default ChaptersRouter;
