import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm'
import { RANOBE_ID_LENGTH, RANOBE_TITLE_LENGTH } from 'utils/constants'
import { genBase64UID } from 'utils'

@Entity({
  name: 'ranobes',
})
export class Ranobe {
  @PrimaryColumn({ length: RANOBE_ID_LENGTH })
  id: string

  @Column({ length: RANOBE_TITLE_LENGTH })
  title: string

  @BeforeInsert()
  onInsert() {
    this.id = genBase64UID(RANOBE_ID_LENGTH)
  }
}
