import { Column, Entity, PrimaryColumn } from 'typeorm'
import { RANOBE_ID_LENGTH, RANOBE_TITLE_LENGTH } from 'utils'

@Entity({
  name: 'ranobes',
})
export class Ranobe {
  @PrimaryColumn({ length: RANOBE_ID_LENGTH })
  id: string

  @Column({ length: RANOBE_TITLE_LENGTH })
  title: string
}
