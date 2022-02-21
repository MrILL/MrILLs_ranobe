import { Ranobe } from 'ranobes'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { RANOBE_DOMAIN_ID_LENGTH, SHORT_TEXT_LENGTH } from 'utils'

@Entity({
  name: 'ranobe_domains',
})
export class RanobeDomain {
  @PrimaryColumn({ length: RANOBE_DOMAIN_ID_LENGTH })
  id: string

  @Column({ length: SHORT_TEXT_LENGTH })
  domain: string

  @Column()
  source: string

  @ManyToOne(() => Ranobe)
  ranobe: Ranobe
}
