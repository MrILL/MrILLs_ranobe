import { MigrationInterface, QueryRunner } from "typeorm";

export class LegacyV21672764838729 implements MigrationInterface {
    name = 'LegacyV21672764838729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ranobes" DROP COLUMN "title_alt"`);
        await queryRunner.query(`ALTER TABLE "ranobes" ADD "title_alt" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ranobes" DROP COLUMN "title_alt"`);
        await queryRunner.query(`ALTER TABLE "ranobes" ADD "title_alt" character varying(7)`);
    }

}
