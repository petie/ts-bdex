import { MigrationInterface, QueryRunner } from "typeorm";

export class Chain1688470988968 implements MigrationInterface {
  name = "Chain1688470988968";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chain" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e273aafae283b886672c952ecd" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "chain"`);
  }
}
