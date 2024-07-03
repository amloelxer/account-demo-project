import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
  Index,
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

  @Index()
  @Column()
  sourceAccountId: string;

  @Index()
  @Column()
  destinationAccountId: string;

  @Column({ type: "money" })
  transferAmount: number;

  @Index()
  @Column({
    type: "enum",
    enum: TransactionStatus,
    default: TransactionStatus.NOT_STARTED,
  })
  status: TransactionStatus;

  @Column({ nullable: true })
  failureReason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Transfer;
