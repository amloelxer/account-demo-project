import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";

import Account from "./account";

enum UserType {
  INVESTOR = "Investor",
  FUND_MANAGER = "FundManager",
}

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @Column({
    type: "enum",
    enum: UserType,
    default: UserType.INVESTOR,
  })
  type: UserType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;
