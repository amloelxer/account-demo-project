import { Worker, Job } from 'bullmq';
import AppDataSource from './data-source';
const processQueueItem = async () => {

}

const startProcessingQueue = async () => {
    await AppDataSource.initialize();
    console.log(`Starting to listen for items on the queue`)
    const worker = new Worker("transfer-queue", async (job: Job) => {
        // Optionally report some progress
        await job.updateProgress(42);
      
        // Optionally sending an object as progress
        await job.updateProgress({ foo: 'bar' });
      
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