import Router from 'koa-router';
import { CustomBasicRouter } from '../utils';
import { RanobesService, RanobesRepo, RanobesRouter } from '../ranobes';
import {
  RanobeDomainsService,
  RanobeDomainsRepo,
  RanobeDomainsRouter,
} from '../ranobeDomains';
import { ChaptersRepo, ChaptersRouter, ChaptersService } from '../chapters';

class MyRouter extends CustomBasicRouter {
  constructor(db) {
    this.routers = [];
    this.router = new Router();

    const ranobesRepo = new RanobesRepo(db);
    const ranobesSrvc = new RanobesService(ranobesRepo);
    this.routers.push(new RanobesRouter(ranobesSrvc));

    const ranobeDomainsRepo = new RanobeDomainsRepo(db);
    const ranobeDomainsSrvc = new RanobeDomainsService(
      ranobeDomainsRepo,
      ranobesRepo
    );
    this.routers.push(new RanobeDomainsRouter(ranobeDomainsSrvc));

    const chaptersRepo = new ChaptersRepo(db);
    const chaptersSrvc = new ChaptersService(
      ranobesRepo,
      ranobeDomainsRepo,
      chaptersRepo
    );
    this.routers.push(new ChaptersRouter(chaptersSrvc));

    this.routers.forEach((route) => {
      this.router.use(route.routes(), route.allowedMethods());
    });
  }
}

export default MyRouter;
