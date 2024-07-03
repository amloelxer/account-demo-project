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
import User from "./user";

enum FinancialEntityType {
  INDIVIDUAL_INVESTOR = "IndividualInvestor",
  FAMILY_OFFICE = "FamilyOffice",
  INSTITUTIONAL_FUND = "INSTITUTIONAL_FUND",
}

@Entity()
class FinancialEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Account, (account) => account.financialEntity)
  accounts: Account[];

  @Column({
    type: "enum",
    enum: FinancialEntityType,
    default: FinancialEntityType.INDIVIDUAL_INVESTOR,
  })
  type: FinancialEntityType;

  @OneToMany(() => User, (user) => user.financialEntity)
  users: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default FinancialEntity;