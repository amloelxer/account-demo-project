import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import User from "./user";
import FinancialEntity from "./financialEntity";

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

  // The id used to reference other accounts outsite of our system
  // needed for interacting with third party API's
  @Column()
  externalAccountId: string;

  @ManyToOne(() => FinancialEntity, (financialEntity) => financialEntity.accounts)
  financialEntity: FinancialEntity;

  // @Column({ type: "money" })
  // balance: number;

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
