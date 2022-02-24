import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RanobesController } from './ranobes.controller'
import { RanobesService } from './ranobes.service'
import { RanobesRepository } from './ranobes.repository'
import { Ranobe } from './ranobe.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Ranobe])],
  controllers: [RanobesController],
  providers: [RanobesService, RanobesRepository],
  exports: [RanobesService],
})
export class RanobesModule {}
