import path = require('path')

import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { ScraperModule } from 'modules/scraper'
import { RanobesModule } from 'modules/ranobes'
import { ChaptersModule } from 'modules/chapters'
import { RanobeChaptersModule } from 'modules/ranobe-chapters'

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    RanobesModule,
    ChaptersModule,
    RanobeChaptersModule,
    ScraperModule,
  ],
  providers: [Logger],
})
export class AppModule {}
