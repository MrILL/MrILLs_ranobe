import { OmitType } from '@nestjs/mapped-types'
import { Chapter } from '../chapter.entity'

export class CreateChapterDto extends OmitType(Chapter, [
  'id',
  'prevChapterId',
  'nextChapterId',
]) {
  prevChapterSource: string
  nextChapterSource: string
}
