import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { INestApplication } from '@nestjs/common'
import { DbModule } from 'db'
import { RanobesModule } from './ranobes.module'
import { CreateRanobeDto, UpdateRanobeDto } from './dto'

import { isBase64UID } from 'utils'

const createRanobeDto: CreateRanobeDto = {
  title: 'RanobeDomains Test1',
}
const updateRanobeDto: UpdateRanobeDto = {
  title: 'Changed Ranobe Test1',
}

const req = (app) => request(app.getHttpServer())
const route = '/ranobes'
const urlParamId = (id) => route + '/' + id

describe('Ranobes', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        DbModule.forRoot({
          initScriptPath: process.cwd() + '\\db_scripts\\init.sql',
        }),
        RanobesModule,
      ],
    }).compile()

    app = module.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    app.close()
  })

  describe('full circle of CRUD without errors', () => {
    let id: string
    let fullEntity

    it('POST /ranobes', () =>
      req(app)
        .post(route)
        .send(createRanobeDto)
        .expect(201)
        .expect((res) => {
          id = res.body.id
          fullEntity = { id, ...createRanobeDto }
          expect(isBase64UID(id)).toBeTruthy()
        }))

    it('GET /ranobes', () =>
      req(app)
        .get(route)
        .expect(200)
        .expect((res) => {
          const createdObj = res.body.find((v) => v.id == id)
          expect(createdObj).toStrictEqual(fullEntity)
        }))

    it('GET /ranobes/:ranobe', () =>
      req(app).get(urlParamId(id)).expect(200).expect(fullEntity))

    it('PUT /ranobes/:ranobe', () =>
      req(app)
        .put(urlParamId(id))
        .send(updateRanobeDto)
        .expect(200)
        .expect({ id, ...updateRanobeDto }))

    it('DELETE /ranobes/:ranobe', () =>
      req(app).delete(urlParamId(id)).expect(204))
  })

  describe('full bunch of errors', () => {
    describe('not found', () => {
      let deletedId

      beforeAll(async () => {
        await req(app)
          .post(route)
          .send(createRanobeDto)
          .expect((res) => {
            deletedId = res.body.id
          })
        await req(app).delete(urlParamId(deletedId))
      })

      it('GET /ranobes/:ranobe', () =>
        req(app).get(urlParamId(deletedId)).expect(404))

      it('PUT /ranobes/:ranobe', () =>
        req(app).put(urlParamId(deletedId)).expect(404))

      it('DELETE /ranobes/:ranobe', () =>
        req(app).delete(urlParamId(deletedId)).expect(404))
    })
  })
})
