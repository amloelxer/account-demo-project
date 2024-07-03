import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
  ManyToOne,
} from "typeorm";

import Account from "./account";
import FinancialEntity from "./financialEntity";

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

  
  @ManyToOne(() => FinancialEntity, (financialEntity) => financialEntity.users)
  financialEntity: FinancialEntity;

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
