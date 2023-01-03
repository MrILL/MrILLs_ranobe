import { MigrationInterface, QueryRunner } from "typeorm";

export class LegacyV21672780492658 implements MigrationInterface {
    name = 'LegacyV21672780492658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ranobe-chapters" ("id" character varying(8) NOT NULL, "ranobeId" character varying(7), "chapterId" character varying(8), CONSTRAINT "REL_48d3ca0bed8d7206fad3d140cf" UNIQUE ("chapterId"), CONSTRAINT "PK_f076f5c43964270b1c1a44921c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ranobe-chapters" ADD CONSTRAINT "FK_2edd601f318f9b2709b2a84aca4" FOREIGN KEY ("ranobeId") REFERENCES "ranobes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ranobe-chapters" ADD CONSTRAINT "FK_48d3ca0bed8d7206fad3d140cfa" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ranobe-chapters" DROP CONSTRAINT "FK_48d3ca0bed8d7206fad3d140cfa"`);
        await queryRunner.query(`ALTER TABLE "ranobe-chapters" DROP CONSTRAINT "FK_2edd601f318f9b2709b2a84aca4"`);
        await queryRunner.query(`DROP TABLE "ranobe-chapters"`);
    }

}
