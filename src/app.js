import dotenv from 'dotenv';
import Koa from 'koa';
import koaBody from 'koa-body';

import router from './routes';
import db from './db';

dotenv.config();
db.init(process.cwd() + '\\config\\db_init.sql');

const app = new Koa();

//TODO use koaBody when it's necessary
app.use(koaBody());
app.use(router.routes(), router.allowedMethods());

app.listen(3000);
