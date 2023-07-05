import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { PoolToken } from "./pool-token.entity";

@Entity()
export class Pool {
  @PrimaryColumn()
  address: string;

  @Column()
  swapFee: string;

  @Column()
  swapEnabled: boolean;

  @Column()
  poolType: string;

  @Column()
  symbol: string;

  @OneToMany(() => PoolToken, (poolToken) => poolToken.pool)
  poolTokens?: PoolToken[];

  @Column()
  type: string;

  @Column()
  totalLiquidity: string;

  @Column()
  name: string;

  @Column()
  swapsCount: string;

  @Column()
  isInRecoveryMode: boolean;
}
