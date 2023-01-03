import { MigrationInterface, QueryRunner } from "typeorm";

export class LegacyV21672768616323 implements MigrationInterface {
    name = 'LegacyV21672768616323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."ranobes_domain_enum" RENAME TO "ranobes_domain_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."ranobes_domain_enum" AS ENUM('ranobelib.me', 'ranobehub.com')`);
        await queryRunner.query(`ALTER TABLE "ranobes" ALTER COLUMN "domain" TYPE "public"."ranobes_domain_enum" USING "domain"::"text"::"public"."ranobes_domain_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ranobes_domain_enum_old"`);
        await queryRunner.query(`ALTER TABLE "ranobes" ADD CONSTRAINT "UQ_92fb672ab95e441b87727c00d7d" UNIQUE ("url")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ranobes" DROP CONSTRAINT "UQ_92fb672ab95e441b87727c00d7d"`);
        await queryRunner.query(`CREATE TYPE "public"."ranobes_domain_enum_old" AS ENUM('ranobelib.me')`);
        await queryRunner.query(`ALTER TABLE "ranobes" ALTER COLUMN "domain" TYPE "public"."ranobes_domain_enum_old" USING "domain"::"text"::"public"."ranobes_domain_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."ranobes_domain_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."ranobes_domain_enum_old" RENAME TO "ranobes_domain_enum"`);
    }

}
