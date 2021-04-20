import dotenv from 'dotenv';
import Koa from 'koa';
import koaBody from 'koa-body';

import Router from './routes';
import { db, init } from './db';

import { ChaptersRepo, RanobeDomainsRepo, RanobesRepo } from './repositories';

dotenv.config();
init(process.cwd() + '\\db_scripts\\init.sql');

const chaptersRepo = new ChaptersRepo(db);
const ranobeDomainsRepo = new RanobeDomainsRepo(db);
const ranobesRepo = new RanobesRepo(db);

const app = new Koa();
const router = new Router({ chaptersRepo, ranobeDomainsRepo, ranobesRepo });
//TODO use koaBody when it's necessary
app.use(koaBody());
app.use(router.routes(), router.allowedMethods());

app.listen(3000);