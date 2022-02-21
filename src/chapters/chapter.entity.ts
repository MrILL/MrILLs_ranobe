import { RanobeDomain } from 'ranobe-domains'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { CHAPTER_ID_LENGTH, SHORT_TEXT_LENGTH, URL_LENGTH } from 'utils'

@Entity({
  name: 'chapters',
})
export class Chapter {
  @PrimaryColumn({ length: CHAPTER_ID_LENGTH })
  id: string

  @ManyToOne(() => RanobeDomain)
  ranobeDomain: RanobeDomain

  @Column({ type: 'int' })
  nomer: number

  @Column({ length: URL_LENGTH })
  source: string

  @Column({ length: SHORT_TEXT_LENGTH })
  title: string

  @Column()
  body: string
}
