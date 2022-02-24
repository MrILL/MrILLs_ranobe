import { Ranobe } from 'modules/ranobes'
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { genBase64UID } from 'utils'
import {
  RANOBE_DOMAIN_ID_LENGTH,
  SHORT_TEXT_LENGTH,
  URL_LENGTH,
} from 'utils/constants'

@Entity({
  name: 'ranobe_domains',
})
export class RanobeDomain {
  @PrimaryColumn({ length: RANOBE_DOMAIN_ID_LENGTH })
  id: string

  @Column({ length: SHORT_TEXT_LENGTH })
  domain: string

  @Column({ length: URL_LENGTH })
  source: string

  @ManyToOne(() => Ranobe)
  ranobe: Ranobe

  @BeforeInsert()
  onInsert() {
    this.id = genBase64UID(RANOBE_DOMAIN_ID_LENGTH)
  }
}
