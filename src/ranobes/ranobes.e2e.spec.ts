import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from 'src/db';
import { Ranobe } from './entities';
import { INestApplication } from '@nestjs/common';
import { RanobesModule } from './ranobes.module';

import { isBase64UID } from 'src/utils';

const entity: Partial<Ranobe> = {
  title: 'Ranobe Test1',
};
const changedEntity: Partial<Ranobe> = {
  title: 'Changed Ranobe Test1',
};

const req = (app) => request(app.getHttpServer());
const route = '/ranobes';
const urlParamId = (id) => route + '/' + id;

describe('Ranobes', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        DbModule.forRoot({
          initScriptPath: process.cwd() + '\\db_scripts\\init.sql',
        }),
        RanobesModule,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  describe('full circle of CRUD without errors', () => {
    let id: string;
    let fullEntity;

    it('POST /ranobes', () =>
      req(app)
        .post(route)
        .send(entity)
        .expect(201)
        .expect((res) => {
          id = res.body.id;
          fullEntity = { id, ...entity };
          expect(isBase64UID(id)).toBeTruthy();
        }));

    it('GET /ranobes', () =>
      req(app)
        .get(route)
        .expect(200)
        .expect((res) => {
          const createdObj = res.body.find((v) => v.id == id);
          expect(createdObj).toStrictEqual(fullEntity);
        }));

    it('GET /ranobes/:ranobe', () =>
      req(app).get(urlParamId(id)).expect(200).expect(fullEntity));

    it('PUT /ranobes/:ranobe', () =>
      req(app)
        .put(urlParamId(id))
        .send(changedEntity)
        .expect(200)
        .expect({ id, ...changedEntity }));

    it('DELETE /ranobes/:ranobe', () =>
      req(app).delete(urlParamId(id)).expect(204));
  });

  describe('full bunch of errors', () => {
    describe('not found', () => {
      let deletedId;

      beforeAll(async () => {
        await req(app)
          .post(route)
          .send(entity)
          .expect((res) => {
            deletedId = res.body.id;
          });
        await req(app).delete(urlParamId(deletedId));
      });

      it('GET /ranobes/:ranobe', () =>
        req(app).get(urlParamId(deletedId)).expect(404));

      it('PUT /ranobes/:ranobe', () =>
        req(app).put(urlParamId(deletedId)).expect(404));

      it('DELETE /ranobes/:ranobe', () =>
        req(app).delete(urlParamId(deletedId)).expect(404));
    });
  });
});
