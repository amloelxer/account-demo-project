import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import Transfer from "./transfer";

@Entity()
class Investor extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Transfer, (transfer) => transfer.source)
  transfers: Transfer[];

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Investor;
