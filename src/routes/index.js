import Router from 'koa-router';
import Controllers from '../controllers';

class MyRouter {
  constructor(repos) {
    this.controller = new Controllers(repos);
    this.router = new Router({ prefix: '/ranobes' });

    // this.router.get('/', this.controller.list); //listRanobes[] from ranobes JOIN ranobesInfo (key = id)
    this.router.post('/', this.controller.addRanobe); //
    // rRouter.post('/:ranobe', addRanobe);
    this.router.put('/:ranobe', this.controller.addRanobeDomain); //PATCH or PUT
    //get '/:ranobe'
    //get '/:ranobe/:chapter'
    // this.router.get('/:ranobe', this.controller.getRanobe);
    // this.router.get('/:ranobe/:chapter', this.controller.getChapter);
    this.router.put('/:ranobe', this.controller.addRanobeDomain); //PATCH or PUT
  }
  routes() {
    return this.router.routes();
  }
  allowedMethods() {
    return this.router.allowedMethods();
  }
}

export default MyRouter;
