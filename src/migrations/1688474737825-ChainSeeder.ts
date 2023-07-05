import { MigrationInterface, QueryRunner } from "typeorm";

export class ChainSeeder1688474737825 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "chain" VALUES (1, 'Ethereum')`);
    await queryRunner.query(`INSERT INTO "chain" VALUES (2, 'Arbitrum')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "chain" WHERE id = 1`);
    await queryRunner.query(`DELETE FROM "chain" WHERE id = 2`);
  }
}
