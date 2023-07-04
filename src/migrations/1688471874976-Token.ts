import { MigrationInterface, QueryRunner } from "typeorm";

export class Token1688471874976 implements MigrationInterface {
  name = "Token1688471874976";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "token" ("address" character varying NOT NULL, "symbol" character varying NOT NULL, CONSTRAINT "PK_40a4dcc6b727285c6539aa1d1c1" PRIMARY KEY ("address"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "token"`);
  }
}
