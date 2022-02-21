import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { RanobesService } from './ranobes.service'
import { CreateRanobeDto, UpdateRanobeDto } from './dto'
import { Ranobe } from './ranobe.entity'

@Controller('ranobes')
export class RanobesController {
  constructor(private readonly ranobesService: RanobesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createRanobeDto: CreateRanobeDto
  ): Promise<Partial<Ranobe>> {
    return this.ranobesService.create(createRanobeDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Ranobe[]> {
    return this.ranobesService.findAll()
  }

  @Get(':ranobe')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('ranobe') id: string): Promise<Ranobe> {
    return this.ranobesService.findOne(id)
  }

  @Put(':ranobe')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('ranobe') id: string,
    @Body() updateRanobeDto: UpdateRanobeDto
  ): Promise<Ranobe> {
    return this.ranobesService.update(id, updateRanobeDto)
  }

  @Delete(':ranobe')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('ranobe') id: string): Promise<void> {
    return this.ranobesService.remove(id)
  }
}
