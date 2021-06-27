import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db';
import { ScraperModule } from './scraper';
import { RanobesModule } from './ranobes';
import { RanobeDomainsModule } from './ranobe-domains';
import { ChaptersModule } from './chapters';

//TODO https://docs.nestjs.com/techniques/configuration#cache-environment-variables
@Module({
  imports: [
    ConfigModule.forRoot(),
    DbModule.forRoot({
      initScriptPath: process.cwd() + '\\db_scripts\\init.sql',
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
