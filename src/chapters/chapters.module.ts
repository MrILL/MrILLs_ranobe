import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { DbModule } from 'src/db';
import { RanobeDomainsModule } from 'src/ranobe-domains';
import { ChaptersRepository } from './chapters.repository';
import { ScraperModule } from 'src/scraper';

@Module({
  imports: [DbModule, RanobeDomainsModule, ScraperModule],
  controllers: [ChaptersController],
  providers: [ChaptersService, ChaptersRepository],
})
export class ChaptersModule {}
