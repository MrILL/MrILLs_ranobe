import { MigrationInterface, QueryRunner } from "typeorm";

export class LegacyV21672764752661 implements MigrationInterface {
    name = 'LegacyV21672764752661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."ranobes_domain_enum" RENAME TO "ranobes_domain_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."ranobes_domain_enum" AS ENUM('ranobelib.me')`);
        await queryRunner.query(`ALTER TABLE "ranobes" ALTER COLUMN "domain" TYPE "public"."ranobes_domain_enum" USING "domain"::"text"::"public"."ranobes_domain_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ranobes_domain_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ranobes_domain_enum_old" AS ENUM('0')`);
        await queryRunner.query(`ALTER TABLE "ranobes" ALTER COLUMN "domain" TYPE "public"."ranobes_domain_enum_old" USING "domain"::"text"::"public"."ranobes_domain_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."ranobes_domain_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."ranobes_domain_enum_old" RENAME TO "ranobes_domain_enum"`);
    }

}
