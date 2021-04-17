import Router from 'koa-router';
import { list, addRanobe } from '../controllers/ranobesController.js';

const rRouter = new Router({
  prefix: '/r',
});

rRouter.get('/', list);
rRouter.post('/', addRanobe);
//get '/:ranobe'
//get '/:ranobe/:chapter'
//request to extract chapter of ranobe
//request to extract ranobe (it's a POST and in body will be url)

export default rRouter;
