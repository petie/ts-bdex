import {
  Entity,
  Column,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Chain } from "./chain.entity";
import { TokenPrice } from "./token-price.entity";

@Entity()
export class Token {
  @PrimaryColumn()
  address: string;

  @Column()
  symbol: string;

  @ManyToOne(() => Chain)
  @JoinColumn()
  chain: Chain;

  @Column()
  chainId: number;

  @Column()
  decimals: number;

  @OneToOne(() => TokenPrice)
  tokenPrice: TokenPrice;

  @Column()
  name: string;
}
