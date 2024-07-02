import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import Fund from "./fund";
import Investor from "./investor";

enum TransactionStatus {
    NOT_STARTED = "NotStarted",
    COMPLETED = "Completed",
    IN_PROGRESS = "InProgress",
    FAILED = "Failed"
}

@Entity()
class Transfer {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "timestamptz", nullable: true })
    timeStarted: Date;

    @Column({ type: "timestamptz", nullable: true })
    timeFinished: Date;

    @ManyToOne(() => Investor, (investor) => investor.transfers)
    source: Investor
    
    @ManyToOne(() => Fund, (fund) => fund.fundTransfers)
    destination: Fund

    @Column({type: "money"})
    transferAmount: number

    @Column({
        type: "enum",
        enum: TransactionStatus,
        default: TransactionStatus.NOT_STARTED
    })
    status: TransactionStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default Transfer;