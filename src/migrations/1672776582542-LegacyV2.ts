import { MigrationInterface, QueryRunner } from "typeorm";

export class LegacyV21672776582542 implements MigrationInterface {
    name = 'LegacyV21672776582542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapters" DROP COLUMN "nomer"`);
        await queryRunner.query(`ALTER TABLE "chapters" ADD "nomer" character varying(7) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapters" DROP COLUMN "nomer"`);
        await queryRunner.query(`ALTER TABLE "chapters" ADD "nomer" integer NOT NULL`);
    }

}
