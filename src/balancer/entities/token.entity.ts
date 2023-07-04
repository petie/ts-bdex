import { Entity, Column, PrimaryColumn, OneToOne } from "typeorm";
import { Chain } from "./chain.entity";

@Entity()
export class Token {
  @PrimaryColumn()
  address: string;

  @Column()
  symbol: string;
  @OneToOne(() => Chain, (chain) => chain.id)
  chainId: number;
}
