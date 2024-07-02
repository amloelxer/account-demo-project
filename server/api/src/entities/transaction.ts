import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

enum TransactionStatus {
    CREATED = "Created",
    COMPLETED = "Completed",
    IN_PROGRESS = "InProgress",
    FAILED = "NotStarted"
}

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "timestamptz" })
    timeStarted: Date;

    @Column({ type: "timestamptz" })
    timeFinished: Date;

    @Column({type: "uuid"})
    investorID: string

    @Column({type: "uuid"})
    fundID: string

    @Column({
        type: "enum",
        enum: TransactionStatus,
        default: TransactionStatus.CREATED
    })
    status: TransactionStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}