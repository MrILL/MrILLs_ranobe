import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { DbModule } from 'src/db'
import { INestApplication } from '@nestjs/common'
import { RanobeDomainsModule } from './ranobe-domains.module'
import { Ranobe, RanobesModule } from 'src/ranobes'
import { CreateRanobeDomainDto, UpdateRanobeDomainDto } from './dto'
import { CreateRanobeDto } from 'src/ranobes/dto'

const createRanobeDto: CreateRanobeDto = {
  title: 'Ranobe Test1',
}

const ranobeEntity: Partial<Ranobe> = {
  title: 'Ranobe Test1',
}

const createRanobeDomainDto: CreateRanobeDomainDto = {
  url: 'https://ranobes.com/ranobe/393-solo-leveling',
}

//TODO
const updateRanobeDomainDto: UpdateRanobeDomainDto = {
  url: 'https://ranobes.com/ranobe/393-solo-leveling',
}

const req = (app) => request(app.getHttpServer())
const ranobesRoute = '/ranobes'
const ranobesParamRoute = (ranobeId) => `/ranobes/${ranobeId}`
const route = (ranobeId) => `/ranobes/${ranobeId}/domains`
const paramRoute = (ranobeId, id) => route(ranobeId) + '/' + id

describe('RanobeDomains', () => {
  let app: INestApplication
  let ranobeId: string

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        DbModule.forRoot({
          initScriptPath: process.cwd() + '\\db_scripts\\init.sql',
        }),
        RanobesModule,
        RanobeDomainsModule,
      ],
    }).compile()

    app = module.createNestApplication()
    await app.init()
  })

  beforeAll(async () => {
    await req(app)
      .post(ranobesRoute)
      .send(ranobeEntity)
      .expect((res) => {
        ranobeId = res.body.id
      })
  })

  afterAll(async () => {
    await req(app).delete(ranobesParamRoute(ranobeId))
  })

  afterAll(async () => {
    app.close()
  })

  describe('full circle of CRUD', () => {
    let domain: string
    let fullDomainEntity

    it('POST /ranobes/:ranobe/domains', () =>
      req(app)
        .post(route(ranobeId))
        .send(createRanobeDomainDto)
        .expect(201)
        .expect((res) => {
          domain = res.body.domain
        }))

    it('GET /ranobes/:ranobe/domains', () =>
      req(app)
        .get(route(ranobeId))
        .expect((res) => {
          fullDomainEntity = {
            id: res.body[0].id,
            ranobeid: ranobeId,
            domain: new URL(createRanobeDomainDto.url).hostname,
            source: createRanobeDomainDto.url,
          }

          expect(res.body).toStrictEqual([fullDomainEntity])
        }))

    //TODO
    it('PUT /ranobes/:ranobe/domains/:domain', () =>
      req(app)
        .put(paramRoute(ranobeId, domain))
        .send(updateRanobeDomainDto)
        .expect(200))

    it('GET /ranobes/:ranobe/domains/:domain', () =>
      req(app)
        .get(paramRoute(ranobeId, domain))
        .expect(200)
        .expect(fullDomainEntity))

    it('DELETE /ranobes/:ranobe/domains/:domain', () =>
      req(app).delete(paramRoute(ranobeId, domain)).expect(204))
  })

  describe('full bunch of errors', () => {
    describe('ranobe not found', () => {
      let deletedId: string

      beforeAll(async () => {
        await req(app)
          .post(ranobesRoute)
          .send(createRanobeDto)
          .expect((res) => {
            deletedId = res.body.id
          })
        await req(app).delete(ranobesParamRoute(deletedId))
      })

      it('POST /ranobes/:ranobe/domains', () =>
        req(app).post(route(deletedId)).send(createRanobeDomainDto).expect(404))

      it('GET /ranobes/:ranobe/domains', () =>
        req(app).get(route(deletedId)).expect(404))

      it('GET /ranobes/:ranobe/domains', () =>
        req(app).get(paramRoute(deletedId, 'random_id')).expect(404))

      it('PUT /ranobes/:ranobe/domains', () =>
        req(app)
          .put(paramRoute(deletedId, 'random_id'))
          .send(updateRanobeDomainDto)
          .expect(404))

      it('PUT /ranobes/:ranobe/domains', () =>
        req(app).delete(paramRoute(deletedId, 'random_id')).expect(404))
    })

    describe('not found', () => {
      it('GET /ranobes/:ranobe/domains', () =>
        req(app).get(route(ranobeId)).expect(404))

      it('GET /ranobes/:ranobe/domains/:domain', () =>
        req(app).get(paramRoute(ranobeId, 'random domain')).expect(404))

      it('PUT /ranobes/:ranobe/domains/:domain', () =>
        req(app)
          .put(paramRoute(ranobeId, 'random domain'))
          .send(updateRanobeDomainDto)
          .expect(404))

      it('DELETE /ranobes/:ranobe/domains/:domain', () =>
        req(app).delete(paramRoute(ranobeId, 'random domain')).expect(404))
    })

    describe('conflict', () => {
      let domain: string

      beforeAll(() =>
        req(app)
          .post(route(ranobeId))
          .send(createRanobeDomainDto)
          .expect(201)
          .expect((res) => {
            domain = res.body.domain
          })
      )

      afterAll(() => req(app).delete(paramRoute(ranobeId, domain)).expect(204))

      it('POST /ranobes/:ranobe/domains', () =>
        req(app).post(route(ranobeId)).send(createRanobeDomainDto).expect(409))
    })
  })
})
