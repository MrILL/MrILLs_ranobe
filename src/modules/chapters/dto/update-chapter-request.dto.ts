import { PartialType } from '@nestjs/mapped-types'
import { CreateChapterRequestDto } from './create-chapter-request.dto'

export class UpdateChapterRequestDto extends PartialType(
  CreateChapterRequestDto
) {}
