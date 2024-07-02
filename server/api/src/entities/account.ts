import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne
} from "typeorm";
import User from "./user"

enum AccountType {
  INVESTOR_ACCOUNT = "InvestorAccount",
  FUND_ACCOUNT = "FundAccount",
}

@Entity()
class Account extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  // The id used to reference other accounts
  @Column()
  externalAccountId: String;

  @Column()
  routingNumber: String;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @Column({ type: "money" })
  balance: number;

  @Column({
    type: "enum",
    enum: AccountType,
    default: AccountType.INVESTOR_ACCOUNT,
  })

  @Column()
  ownerId: String;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Account;
