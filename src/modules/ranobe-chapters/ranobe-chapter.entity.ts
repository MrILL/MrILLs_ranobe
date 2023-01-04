import {
  BeforeInsert,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'

import { Ranobe } from 'modules/ranobes'
import { Chapter } from 'modules/chapters'
import { genBase64UID } from 'utils'
import { CHAPTER_ID_LENGTH } from 'utils/constants'

@Entity({
  name: 'ranobe-chapters',
})
export class RanobeChapters {
  @PrimaryColumn({ length: CHAPTER_ID_LENGTH })
  id: string

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
