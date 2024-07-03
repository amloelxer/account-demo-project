import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import FinancialEntity from "./financialEntity";

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

  @ManyToOne(
    () => FinancialEntity,
    (financialEntity) => financialEntity.accounts,
  )
  financialEntity: FinancialEntity;

  // No need to keep track of this right now but might in the future
  // @Column({ type: "money" })
  // balance: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Account;
