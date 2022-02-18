import { Module } from '@nestjs/common'
import { RanobesController } from './ranobes.controller'
import { RanobesService } from './ranobes.service'
import { RanobesRepository } from './ranobes.repository'
import { DbModule } from 'src/db'

@Module({
  imports: [DbModule],
  controllers: [RanobesController],
  providers: [RanobesService, RanobesRepository],
  exports: [RanobesService],
})
export class RanobesModule {}
