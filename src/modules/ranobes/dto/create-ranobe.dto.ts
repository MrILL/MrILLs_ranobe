import { OmitType } from '@nestjs/mapped-types'
import { Ranobe } from '../ranobe.entity'

export class CreateRanobeDto extends OmitType(Ranobe, ['id'] as const) {}
