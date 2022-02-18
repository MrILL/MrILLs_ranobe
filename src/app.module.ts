import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DbModule } from './db'
import { ScraperModule } from './scraper'
import { RanobesModule } from './ranobes'
import { RanobeDomainsModule } from './ranobe-domains'
import { ChaptersModule } from './chapters'

//TODO https://docs.nestjs.com/techniques/configuration#cache-environment-variables
@Module({
  imports: [
    ConfigModule.forRoot(),
    DbModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          initScriptPath: process.cwd() + '\\db_scripts\\init.sql',
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        }
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
