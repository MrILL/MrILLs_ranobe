import { MigrationInterface, QueryRunner } from "typeorm";

export class LegacyV21672772705534 implements MigrationInterface {
    name = 'LegacyV21672772705534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapters" ADD CONSTRAINT "UQ_7ad983d4eb90d8c0fec8bb0245c" UNIQUE ("url")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapters" DROP CONSTRAINT "UQ_7ad983d4eb90d8c0fec8bb0245c"`);
    }

}
