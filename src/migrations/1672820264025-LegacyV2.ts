import { MigrationInterface, QueryRunner } from "typeorm";

export class LegacyV21672820264025 implements MigrationInterface {
    name = 'LegacyV21672820264025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chapters" ("id" character varying(8) NOT NULL, "volume" integer NOT NULL, "nomer" character varying(7) NOT NULL, "url" character varying(2047) NOT NULL, "title" character varying(255) NOT NULL, "content" character varying NOT NULL, "prevChapterId" character varying(8), "nextChapterId" character varying(8), CONSTRAINT "UQ_7ad983d4eb90d8c0fec8bb0245c" UNIQUE ("url"), CONSTRAINT "PK_a2bbdbb4bdc786fe0cb0fcfc4a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ranobes" ("id" character varying(7) NOT NULL, "domain" character(100) NOT NULL, "url" character varying(2047) NOT NULL, "title" character varying(100) NOT NULL, "slug" character varying(100), "description" character varying, "title_alt" character varying(100), "type" character varying(127), "format" character varying(127), "publish_year" character varying(127), "status" character varying(127), "translation_status" character varying(127), "author" character varying(127), "artist" character varying(127), "publishing_by" character varying(127), "age_restriction" character varying(127), "alt_titles" character varying(2047), "tags" character varying(2047), CONSTRAINT "UQ_92fb672ab95e441b87727c00d7d" UNIQUE ("url"), CONSTRAINT "PK_11f74dbf44f800c852c8a654ff3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ranobe-chapters" ("id" character varying(8) NOT NULL, "ranobeId" character varying(7), "chapterId" character varying(8), CONSTRAINT "REL_48d3ca0bed8d7206fad3d140cf" UNIQUE ("chapterId"), CONSTRAINT "PK_f076f5c43964270b1c1a44921c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ranobe-chapters" ADD CONSTRAINT "FK_2edd601f318f9b2709b2a84aca4" FOREIGN KEY ("ranobeId") REFERENCES "ranobes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ranobe-chapters" ADD CONSTRAINT "FK_48d3ca0bed8d7206fad3d140cfa" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ranobe-chapters" DROP CONSTRAINT "FK_48d3ca0bed8d7206fad3d140cfa"`);
        await queryRunner.query(`ALTER TABLE "ranobe-chapters" DROP CONSTRAINT "FK_2edd601f318f9b2709b2a84aca4"`);
        await queryRunner.query(`DROP TABLE "ranobe-chapters"`);
        await queryRunner.query(`DROP TABLE "ranobes"`);
        await queryRunner.query(`DROP TABLE "chapters"`);
    }

}
