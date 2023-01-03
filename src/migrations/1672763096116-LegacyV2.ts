import { MigrationInterface, QueryRunner } from "typeorm";

export class LegacyV21672763096116 implements MigrationInterface {
    name = 'LegacyV21672763096116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chapters" ("id" character varying(8) NOT NULL, "volume" integer NOT NULL, "nomer" integer NOT NULL, "title" character varying(255) NOT NULL, "body" character varying NOT NULL, "source" character varying(2047) NOT NULL, "prevChapterId" character varying(8), "nextChapterId" character varying(8), CONSTRAINT "PK_a2bbdbb4bdc786fe0cb0fcfc4a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ranobes_domain_enum" AS ENUM('0')`);
        await queryRunner.query(`CREATE TABLE "ranobes" ("id" character varying(7) NOT NULL, "domain" "public"."ranobes_domain_enum" NOT NULL, "url" character varying(2047) NOT NULL, "title" character varying(100) NOT NULL, "slug" character varying(100), "description" character varying, "title_alt" character varying(7), "type" character varying(127), "format" character varying(127), "publish_year" character varying(127), "status" character varying(127), "translation_status" character varying(127), "author" character varying(127), "artist" character varying(127), "publishing_by" character varying(127), "age_restriction" character varying(127), "alt_titles" character varying(2047), "tags" character varying(2047), CONSTRAINT "PK_11f74dbf44f800c852c8a654ff3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ranobes"`);
        await queryRunner.query(`DROP TYPE "public"."ranobes_domain_enum"`);
        await queryRunner.query(`DROP TABLE "chapters"`);
    }

}
