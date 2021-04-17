import Router from 'koa-router';
import rRouter from './ranobes.js';

const router = new Router();

//TODO think about automatic router.use to every /routes file via require
router.use(rRouter.routes(), rRouter.allowedMethods());

export default router;
