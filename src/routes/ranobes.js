import Router from 'koa-router';
import {
  list,
  addRanobeInfo,
  addRanobe,
} from '../controllers/ranobesController.js';

const rRouter = new Router();

rRouter.get('/r', list);
rRouter.post('/r', addRanobeInfo);
rRouter.post('/:ranobe', addRanobe);
//get '/:ranobe'
//get '/:ranobe/:chapter'
//request to extract chapter of ranobe
//request to extract ranobe (it's a POST and in body will be url)

export default rRouter;
