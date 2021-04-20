import Router from 'koa-router';
import {
  // list,
  addRanobeInfo,
  addRanobe,
} from '../controllers';

const rRouter = new Router();

rRouter.get('/ranobes', list); //listRanobes[] from ranobes JOIN ranobesInfo (key = id)

rRouter.post('/ranobes', addRanobeInfo); //

// rRouter.post('/:ranobe', addRanobe);
rRouter.put('/ranobes/:ranobe', addRanobeDomain); //PATCH or PUT

//get '/:ranobe'
//get '/:ranobe/:chapter'

rRouter.get('/ranobes/:ranobe', getRanobe);
rRouter.get('/ranobes/:ranobe/:chapter', getChapter);
rRouter.put('/ranobes/:ranobe', addRanobeDomain); //PATCH or PUT

export default rRouter;
