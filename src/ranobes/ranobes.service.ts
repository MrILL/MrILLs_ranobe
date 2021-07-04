import { Injectable } from '@nestjs/common';
import { genBase64UID } from 'src/utils';
import { RanobesHttpException } from './ranobes.exceptions';
import { CreateRanobeDto, UpdateRanobeDto } from './dto';
import { RanobesRepository } from './ranobes.repository';
import { Ranobe } from './entities';

@Injectable()
export class RanobesService {
  constructor(private readonly ranobesRepository: RanobesRepository) {}

  async create(createRanobeDto: CreateRanobeDto): Promise<Partial<Ranobe>> {
    const id = genBase64UID(7);

    return await this.ranobesRepository.create(id, createRanobeDto);
  }

  async findAll(): Promise<Ranobe[]> {
    const res = await this.ranobesRepository.findAll();
    if (!res || res.length === 0) {
      throw RanobesHttpException.NotFound();
    }

    return res;
  }

  async findOne(id: string): Promise<Ranobe> {
    const res = await this.ranobesRepository.findOne(id);
    if (!res) {
      throw RanobesHttpException.NotFound();
    }

    return res;
  }

  async update(id: string, updateRanobeDto: UpdateRanobeDto): Promise<Ranobe> {
    const checkRanobe = await this.ranobesRepository.findOne(id);
    if (!checkRanobe) {
      throw RanobesHttpException.NotFound();
    }

    return await this.ranobesRepository.update(id, {
      ...checkRanobe,
      ...updateRanobeDto,
    });
  }

  async remove(id: string): Promise<void> {
    const checkRanobe = await this.ranobesRepository.findOne(id);
    if (!checkRanobe) {
      throw RanobesHttpException.NotFound();
    }

    const res = await this.ranobesRepository.remove(id);
    if (!res) {
      throw RanobesHttpException.InternalServerError('unable to delete record');
    }
  }
}
