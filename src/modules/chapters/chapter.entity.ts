import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { genBase64UID } from 'utils'
import {
  CHAPTER_ID_LENGTH,
  SHORT_TEXT_LENGTH,
  URL_LENGTH,
} from 'utils/constants'

@Entity({
  name: 'chapters',
})
export class Chapter {
  @PrimaryColumn({ length: CHAPTER_ID_LENGTH })
  id: string

  @Column()
  volume: number

  @Column({ length: 7 })
  nomer: string

  @Column({ length: URL_LENGTH, unique: true })
  url: string

  @Column({ length: SHORT_TEXT_LENGTH })
  title: string

  @Column()
  content: string

  @Column({ length: CHAPTER_ID_LENGTH, nullable: true })
  prevChapterId?: string

  @Column({ length: CHAPTER_ID_LENGTH, nullable: true })
  nextChapterId?: string

  //TODO remove
  // @ManyToOne(() => RanobeDomain)
  // ranobeDomain: RanobeDomain

  @BeforeInsert()
  onInsert() {
    this.id = genBase64UID(CHAPTER_ID_LENGTH)
  }
}
