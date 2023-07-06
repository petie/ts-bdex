import { MigrationInterface, QueryRunner } from "typeorm";

export class Pools1688653454542 implements MigrationInterface {
    name = 'Pools1688653454542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token_price" ("id" SERIAL NOT NULL, "usdPrice" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "tokenId" character varying NOT NULL, "tokenAddress" character varying, CONSTRAINT "REL_e7894ff1e299807a540653696e" UNIQUE ("tokenAddress"), CONSTRAINT "PK_dcc681716689f0d6311c0498c61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("address" character varying NOT NULL, "symbol" character varying NOT NULL, "chainId" integer NOT NULL, "decimals" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_40a4dcc6b727285c6539aa1d1c1" PRIMARY KEY ("address"))`);
        await queryRunner.query(`CREATE TABLE "pool_token" ("id" SERIAL NOT NULL, "weight" integer, "balance" character varying NOT NULL, "tokenId" character varying NOT NULL, "poolId" character varying NOT NULL, "tokenAddress" character varying, "poolAddress" character varying, CONSTRAINT "UQ_f9c54f7cdd5a0fa4acc1a829d6e" UNIQUE ("poolId", "tokenId"), CONSTRAINT "PK_ba4b34630b3bb4c9676c9982687" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pool" ("address" character varying NOT NULL, "swapFee" character varying NOT NULL, "swapEnabled" boolean NOT NULL, "poolType" character varying NOT NULL, "symbol" character varying NOT NULL, "type" character varying NOT NULL, "totalLiquidity" character varying NOT NULL, "name" character varying NOT NULL, "swapsCount" character varying NOT NULL, "isInRecoveryMode" boolean NOT NULL, CONSTRAINT "PK_0764827295d4ed49e259aa398fc" PRIMARY KEY ("address"))`);
        await queryRunner.query(`ALTER TABLE "token_price" ADD CONSTRAINT "FK_e7894ff1e299807a540653696e2" FOREIGN KEY ("tokenAddress") REFERENCES "token"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_418cc7c9b0c8d1f1da403377092" FOREIGN KEY ("chainId") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool_token" ADD CONSTRAINT "FK_7a3cea9c062ba979e5762631448" FOREIGN KEY ("tokenAddress") REFERENCES "token"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool_token" ADD CONSTRAINT "FK_c3da8d29d6e09cc65e038e7fe0f" FOREIGN KEY ("poolAddress") REFERENCES "pool"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pool_token" DROP CONSTRAINT "FK_c3da8d29d6e09cc65e038e7fe0f"`);
        await queryRunner.query(`ALTER TABLE "pool_token" DROP CONSTRAINT "FK_7a3cea9c062ba979e5762631448"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_418cc7c9b0c8d1f1da403377092"`);
        await queryRunner.query(`ALTER TABLE "token_price" DROP CONSTRAINT "FK_e7894ff1e299807a540653696e2"`);
        await queryRunner.query(`DROP TABLE "pool"`);
        await queryRunner.query(`DROP TABLE "pool_token"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "token_price"`);
    }

}
