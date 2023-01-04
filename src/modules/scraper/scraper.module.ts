import { Module, Global } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ScraperControllerV2 } from './scraper-v2.controller'
import { ScraperServiceV2 } from './scraper-v2.service'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [ScraperServiceV2],
  controllers: [ScraperControllerV2],
})
export class ScraperModule {}
