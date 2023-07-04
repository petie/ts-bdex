import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
