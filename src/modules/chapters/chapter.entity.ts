import { RanobeDomain } from 'modules/ranobe-domains'
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { genBase64UID } from 'utils'
import {
  CHAPTER_ID_LENGTH,
  CHAPTER_NOMER_LENGTH,
  SHORT_TEXT_LENGTH,
  URL_LENGTH,
} from 'utils/constants'

@Entity({
  name: 'chapters',
})
export class Chapter {
  @PrimaryColumn({ length: CHAPTER_ID_LENGTH })
  id: string

  @Column({ length: CHAPTER_NOMER_LENGTH, nullable: true })
  nomer: string

  @Column({ length: URL_LENGTH })
  source: string

  @Column({ length: SHORT_TEXT_LENGTH })
  title: string

  @Column()
  body: string

  @ManyToOne(() => RanobeDomain)
  ranobeDomain: RanobeDomain

  @BeforeInsert()
  onInsert() {
    this.id = genBase64UID(CHAPTER_ID_LENGTH)
  }
}
