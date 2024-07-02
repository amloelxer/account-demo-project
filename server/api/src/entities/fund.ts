import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import Transfer from "./transfer";

Entity()
class Fund {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string;

    // @OneToMany(() => Transfer, (transfer) => transfer.destination)
    // transfers: Transfer[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default Fund;