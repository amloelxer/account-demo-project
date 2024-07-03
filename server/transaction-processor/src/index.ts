import { Worker, Job } from "bullmq";
import AppDataSource from "./data-source";
import { processQueueItem } from "./queue/processQueueItem";
import { mockCleanup } from "./utils/mockTransfers";

/**
 * if for some reason the process gets killed for any reason
 * we need to make sure we cleanup and not in an intermediary state
 */
process.on("SIGTERM", () => {
  mockCleanup();
  process.exit(0);
});

process.on("SIGINT", () => {
  mockCleanup();
  process.exit(0);
});

const startProcessingQueue = async () => {
  await AppDataSource.initialize();
  console.log(`Starting to listen for items on the queue`);
  const worker = new Worker(
    "transfer-queue",
    async (job: Job) => {
      await processQueueItem(job);
    },
    {
      connection: {
        host: process.env.REDIS_HOST ?? "127.0.0.1",
        port: parseInt(process.env.REDIS_HOST ?? "6379"),
      },
      // Only try the jobs once on both failure and completion
      removeOnComplete: { count: 0 },
      removeOnFail: { count: 0 },
      // dynamically be able to scale the queue up with an env variable
      concurrency: parseInt(process.env.NUMBER_OF_QUEUE_WORKERS ?? "1"),
    },
  );

  worker.on("completed", (job: Job, _: any) => {
    console.log(`Completed transfer with id: ${job.id}`);
  });

  worker.on("error", (failedReason: Error) => {
    console.error(`An error ocurred with the worked: ${failedReason}`);
  });
};

startProcessingQueue();
