import { MigrationInterface, QueryRunner } from "typeorm";

export class LegacyV21672772029300 implements MigrationInterface {
    name = 'LegacyV21672772029300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapters" DROP COLUMN "body"`);
        await queryRunner.query(`ALTER TABLE "chapters" DROP COLUMN "source"`);
        await queryRunner.query(`ALTER TABLE "chapters" ADD "url" character varying(2047) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chapters" ADD "content" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapters" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "chapters" DROP COLUMN "url"`);
        await queryRunner.query(`ALTER TABLE "chapters" ADD "source" character varying(2047) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chapters" ADD "body" character varying NOT NULL`);
    }

}
