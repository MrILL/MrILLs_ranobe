import { Injectable } from '@nestjs/common'
import { RanobesHttpException } from './ranobes.exceptions'
import { CreateRanobeDto, UpdateRanobeDto } from './dto'
import { RanobesRepository } from './ranobes.repository'
import { Ranobe } from './ranobe.entity'

@Injectable()
export class RanobesService {
  constructor(private readonly ranobesRepository: RanobesRepository) {}

  async create(createRanobeDto: CreateRanobeDto): Promise<Ranobe> {
    return this.ranobesRepository.create(createRanobeDto)
  }

  async findAll(): Promise<Ranobe[]> {
    const res = await this.ranobesRepository.findAll()
    if (!res || res.length === 0) {
      throw RanobesHttpException.NotFound()
    }

    return res
  }

  async findOne(id: string): Promise<Ranobe> {
    const res = await this.ranobesRepository.findOne(id)
    if (!res) {
      throw RanobesHttpException.NotFound()
    }

    return res
  }

  async update(id: string, updateRanobeDto: UpdateRanobeDto): Promise<void> {
    const checkRanobe = await this.ranobesRepository.findOne(id)
    if (!checkRanobe) {
      throw RanobesHttpException.NotFound()
    }

    await this.ranobesRepository.update(id, updateRanobeDto)
  }

  async remove(id: string): Promise<void> {
    const checkRanobe = await this.ranobesRepository.findOne(id)
    if (!checkRanobe) {
      throw RanobesHttpException.NotFound()
    }

    await this.ranobesRepository.remove(id)
  }
}
