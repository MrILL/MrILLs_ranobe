import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { DbModule } from 'db'
import { INestApplication } from '@nestjs/common'
import { Ranobe, RanobesModule } from 'ranobes'
import { RanobeDomainsModule } from 'ranobe-domains'
import { CreateRanobeDomainDto } from 'ranobe-domains/dto'
import { ChaptersModule } from '.'
import { CreateChapterDto } from './dto'
import { ScraperModule } from 'scraper'

const ranobeEntity: Partial<Ranobe> = {
  title: 'Chapters Test1',
}

const domainEntity: CreateRanobeDomainDto = {
  url: 'https://ranobes.com/ranobe/393-solo-leveling',
}

const chapterSource =
  'https://ranobes.com/chapters/solo-leveling-org/23557-tom-1-glava-1-ohotnik-ranga-e.html'
const createChapterDto: CreateChapterDto = {
  source: chapterSource,
}

const req = (app) => request(app.getHttpServer())

const ranobesRoute = '/ranobes'
const ranobesParamRoute = (ranobeId) => `/ranobes/${ranobeId}`

const domainRoute = (ranobeId) => `/ranobes/${ranobeId}/domains`
const domainParamRoute = (ranobeId, domain) =>
  domainRoute(ranobeId) + '/' + domain

const route = (ranobeId) => `/ranobes/${ranobeId}/chapters`
const paramRoute = (ranobeId, domain, nomer) =>
  `/ranobes/${ranobeId}/${domain}/chapters/${nomer}`

describe('Chapters', () => {
  let app: INestApplication

  let ranobeId: string
  let domain

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        DbModule.forRoot({
          initScriptPath: process.cwd() + '\\db_scripts\\init.sql',
        }),
        RanobesModule,
        RanobeDomainsModule,
        ChaptersModule,
        ScraperModule.forRoot(),
      ],
    }).compile()

    app = module.createNestApplication()
    await app.init()
  })

  //create ranobe and domain
  beforeAll(async () => {
    await req(app)
      .post(ranobesRoute)
      .send(ranobeEntity)
      .expect((res) => {
        ranobeId = res.body.id
      })

    await req(app)
      .post(domainRoute(ranobeId))
      .send(domainEntity)
      .expect((res) => {
        domain = res.body.domain
      })
  })

  afterAll(async () => {
    await req(app).delete(ranobesParamRoute(ranobeId))

    await req(app).delete(domainParamRoute(ranobeId, domain))
  })

  afterAll(async () => {
    app.close()
  })

  describe('full circle of CRUD', () => {
    const nomer = 1 //TODO

    it('POST /ranobes/:ranobe/chapters', () =>
      req(app).post(route(ranobeId)).send(createChapterDto).expect(201))

    it('GET /ranobes/:ranobe/chapters?domain', () =>
      req(app).get(route(ranobeId)).query({ domain }).expect(200))

    //TODO
    // it('PUT /ranobes/:ranobe/domains/:domain/chapters/:chapter', () =>
    //   req(app)
    //     .put(paramRoute(ranobeId, domain, nomer))
    //     .send(updateChapterDto)
    //     .expect(200));

    it('GET /ranobes/:ranobe/:domain/chapters/:chapter', () =>
      req(app).get(paramRoute(ranobeId, domain, nomer)).expect(200))

    it('DELETE /ranobes/:ranobe/:domain/chapters/:chapter', () =>
      req(app).delete(paramRoute(ranobeId, domain, nomer)).expect(204))
  })
})
