import { MigrationInterface, QueryRunner } from 'typeorm'

export class Legacy1645696671005 implements MigrationInterface {
  name = 'Legacy1645696671005'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ranobes" (
       "id" character varying(7) NOT NULL, 
       "title" character varying(100) NOT NULL, 
       CONSTRAINT "PK_11f74dbf44f800c852c8a654ff3" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "ranobe_domains" (
       "id" character varying(7) NOT NULL, 
       "domain" character varying(255) NOT NULL, 
       "source" character varying(2048) NOT NULL, 
       "ranobeId" character varying(7), 
       CONSTRAINT "PK_aa86a3e5424553aee1a6a1b7dfb" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "chapters" (
        "id" character varying(7) NOT NULL, 
        "nomer" character varying(14), 
        "source" character varying(2048) NOT NULL, 
        "title" character varying(255) NOT NULL,
        "body" character varying NOT NULL, 
        "ranobeDomainId" character varying(7), 
        CONSTRAINT "PK_a2bbdbb4bdc786fe0cb0fcfc4a0" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "ranobe_domains" ADD CONSTRAINT "FK_da51187f745bb850b75dc9d8a30" 
        FOREIGN KEY ("ranobeId") REFERENCES "ranobes"("id") 
        ON DELETE NO ACTION 
        ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "chapters" ADD CONSTRAINT "FK_46aba0a618ac2055a59930369bb" 
        FOREIGN KEY ("ranobeDomainId") REFERENCES "ranobe_domains"("id") 
        ON DELETE NO ACTION 
        ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chapters" DROP CONSTRAINT "FK_46aba0a618ac2055a59930369bb"`
    )
    await queryRunner.query(
      `ALTER TABLE "ranobe_domains" DROP CONSTRAINT "FK_da51187f745bb850b75dc9d8a30"`
    )
    await queryRunner.query(`DROP TABLE "chapters"`)
    await queryRunner.query(`DROP TABLE "ranobe_domains"`)
    await queryRunner.query(`DROP TABLE "ranobes"`)
  }
}
