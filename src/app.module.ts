import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DbModule } from './db'
import { ScraperModule } from './scraper'
import { RanobesModule } from './ranobes'
import { RanobeDomainsModule } from './ranobe-domains'
import { ChaptersModule } from './chapters'
import path = require('path')

//TODO https://docs.nestjs.com/techniques/configuration#cache-environment-variables
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          host: configService.get('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          database: configService.get('DB_DATABASE'),
          entities: [path.join(process.cwd(), 'src/**/**.entity.ts')],
          synchronize: configService.get('DB_SYNC') === 'true',
        } as TypeOrmModuleOptions
      },
    }),
    ScraperModule.forRoot(),
    RanobesModule,
    RanobeDomainsModule,
    ChaptersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
