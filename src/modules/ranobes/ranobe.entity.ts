import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm'
import {
  RANOBE_ID_LENGTH,
  RANOBE_TITLE_LENGTH,
  SupportedDomains,
  URL_LENGTH,
} from 'utils/constants'
import { genBase64UID } from 'utils'

@Entity({
  name: 'ranobes',
})
export class Ranobe {
  @PrimaryColumn({ length: RANOBE_ID_LENGTH })
  id: string

  // TODO enum
  @Column({ type: 'enum', enum: SupportedDomains })
  domain: SupportedDomains

  @Column({ length: URL_LENGTH, unique: true })
  url: string

  @Column({ length: RANOBE_TITLE_LENGTH })
  title: string

  //

  @Column({ length: RANOBE_TITLE_LENGTH, nullable: true })
  slug: string

  @Column({ nullable: true })
  description: string

  @Column({ length: RANOBE_TITLE_LENGTH, nullable: true })
  title_alt: string

  // Additional

  @Column({ length: 127, nullable: true })
  type: string

  @Column({ length: 127, nullable: true })
  format: string

  @Column({ length: 127, nullable: true })
  publish_year: string

  @Column({ length: 127, nullable: true })
  status: string

  @Column({ length: 127, nullable: true })
  translation_status: string

  @Column({ length: 127, nullable: true })
  author: string

  @Column({ length: 127, nullable: true })
  artist: string

  @Column({ length: 127, nullable: true })
  publishing_by: string

  @Column({ length: 127, nullable: true })
  age_restriction: string

  // smth like alts.join(',')
  @Column({ length: 2047, nullable: true })
  alt_titles: string

  //TODO separate table
  // smth like alts.join(';')
  @Column({ length: 2047, nullable: true })
  tags: string

  @BeforeInsert()
  onInsert() {
    this.id = genBase64UID(RANOBE_ID_LENGTH)
  }
}
