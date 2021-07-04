import { PartialType } from '@nestjs/mapped-types';
import { CreateRanobeDomainDto } from './create-ranobe-domain.dto';

export class UpdateRanobeDomainDto extends PartialType(CreateRanobeDomainDto) {
  url: string;
}
