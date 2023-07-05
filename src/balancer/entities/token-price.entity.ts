import { Token } from "./token.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class TokenPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usdPrice: string;

  @Column({ type: "timestamptz" })
  timestamp: Date;

  @OneToOne(() => Token)
  @JoinColumn()
  token: Token;

  @Column()
  tokenId: string;
}
