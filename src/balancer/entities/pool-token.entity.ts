import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import { Token } from "./token.entity";
import { Pool } from "./pool.entity";

@Entity()
@Unique(["poolId", "tokenId"])
export class PoolToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  weight?: number;

  @Column()
  balance: string;

  @ManyToOne(() => Token)
  @JoinColumn()
  token: Token;

  @Column()
  tokenId: string;

  @ManyToOne(() => Pool, (pool) => pool.poolTokens)
  @JoinColumn()
  pool: Pool;

  @Column()
  poolId: string;
}
