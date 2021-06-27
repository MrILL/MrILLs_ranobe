import { PartialType } from '@nestjs/mapped-types';
import { CreateRanobeDto } from './create-ranobe.dto';

export class UpdateRanobeDto extends PartialType(CreateRanobeDto) {
  title: string;
}
