import { Worker, Job } from 'bullmq';
import AppDataSource from './data-source';
import Transfer, { TransactionStatus } from './entities/transfer';
import { DateTime } from "luxon"
const processQueueItem = async () => {

}
const startProcessingQueue = async () => {
    await AppDataSource.initialize();
    console.log(`Starting to listen for items on the queue`)
    const worker = new Worker("transfer-queue", async (job: Job) => {
        // Optionally report some progress
        const queuedTransfer = await Transfer.findOneBy({
            id: job.id
        })

        if(!queuedTransfer) {
            console.error(`Something has gone real wrong`)
            return
        }

        // set the start time on the queued transfer
        queuedTransfer.status = TransactionStatus.IN_PROGRESS
        queuedTransfer.timeStarted = DateTime.now().toUTC().toJSDate()
        const transferInProgress = await queuedTransfer.save()
        const transferAmount = transferInProgress.transferAmount;

        // Do something with job
        return 'some value';
    }, {
        connection: {
            host: process.env.REDIS_HOST ?? "127.0.0.1",
            port: parseInt(process.env.REDIS_HOST ?? "6379")
        }, 
        removeOnComplete: { count: 0 }
    });

    worker.on('completed', (job: Job, returnvalue: any) => {
        console.log(`Completed`)
    });
}


startProcessingQueue()