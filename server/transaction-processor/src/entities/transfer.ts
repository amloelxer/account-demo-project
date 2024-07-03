import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";

export enum TransactionStatus {
  NOT_STARTED = "NotStarted",
  COMPLETED = "Completed",
  IN_PROGRESS = "InProgress",
  FAILED = "Failed",
}

@Entity()
class Transfer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "timestamptz", nullable: true })
  timeStarted: Date;

  @Column({ type: "timestamptz", nullable: true })
  timeFinished: Date;

  @Column()
  sourceAccountId: string;

  @Column()
  destinationAccountId: string;

  @Column({ type: "money" })
  transferAmount: number;

  @Column({
    type: "enum",
    enum: TransactionStatus,
    default: TransactionStatus.NOT_STARTED,
  })
  status: TransactionStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Transfer;
