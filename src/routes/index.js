import Router from 'koa-router';
import Controllers from '../controllers';

class MyRouter {
  constructor(repos) {
    this.controller = new Controllers(repos);
    this.router = new Router({ prefix: '/ranobes' });

    this.router.get('/', this.controller.listRanobesInfo); // return array of 'ranobesInfo' with JOIN ranobesInfo (key = id)
    this.router.post('/', this.controller.addRanobe); //

    this.router.get('/:ranobe', this.controller.getRanobeDomain);
    this.router.put('/:ranobe', this.controller.addRanobeDomain); //PATCH or PUT
    // this.router.get('/:ranobe', this.controller.getRanobe);
    // this.router.get('/:ranobe/:chapter', this.controller.getChapter);
  }
  routes() {
    return this.router.routes();
  }
  allowedMethods() {
    return this.router.allowedMethods();
  }
}

export default MyRouter;
