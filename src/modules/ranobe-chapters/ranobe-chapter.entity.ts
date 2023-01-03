import {
  BeforeInsert,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'

import { Ranobe } from 'modules/ranobes/ranobe.entity'
import { Chapter } from 'modules/chapters/chapter.entity'
import { genBase64UID } from 'utils'
import { CHAPTER_ID_LENGTH } from 'utils/constants'

@Entity({
  name: 'ranobe-chapters',
})
export class RanobeChapters {
  @PrimaryColumn({ length: CHAPTER_ID_LENGTH })
  id: string

  // Many to one to ranobe
  // One to one to chapter
  @ManyToOne(() => Ranobe)
  ranobe: Ranobe

  @OneToOne(() => Chapter)
  @JoinColumn()
  chapter: Chapter

  @BeforeInsert()
  onInsert() {
    this.id = genBase64UID(CHAPTER_ID_LENGTH)
  }
}
