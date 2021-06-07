import dotenv from 'dotenv';
import Koa from 'koa';
import koaBody from 'koa-body';

import Router from './src/routes';
import { db, init } from './src/db';

dotenv.config();
init(process.cwd() + '\\db_scripts\\init.sql');

const app = new Koa();
const router = new Router(db);

app.use(koaBody());
app.use(router.routes(), router.allowedMethods());

app.listen(3000);
