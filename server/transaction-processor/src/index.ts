import { Worker, Job } from "bullmq";
import AppDataSource from "./data-source";
import Transfer, { TransactionStatus } from "./entities/transfer";
import { DateTime } from "luxon";
import Account from "./entities/account";

const processQueueItem = async (job: Job) => {
  const queuedTransfer = await Transfer.findOneBy({
    id: job.id,
  });

  if (!queuedTransfer) {
    console.error(`Something has gone real wrong`);
    return;
  }

  // set the start time on the queued transfer
  queuedTransfer.status = TransactionStatus.IN_PROGRESS;
  queuedTransfer.timeStarted = DateTime.now().toUTC().toJSDate();
  const transferInProgress = await queuedTransfer.save();
  const transferAmount = transferInProgress.transferAmount;
  const sourceAccount = await Account.findOneByOrFail({
    id: transferInProgress.sourceAccountId,
  });
  const destinationAccount = await Account.findOneByOrFail({
    id: transferInProgress.destinationAccountId,
  });
  await withdrawFromSourceAccount(
    transferAmount,
    sourceAccount.externalAccountId,
  );
  await transferToDestinationAccount(
    transferAmount,
    destinationAccount.externalAccountId,
  );
  transferInProgress.status = TransactionStatus.COMPLETED;
  transferInProgress.timeFinished = DateTime.now().toUTC().toJSDate();
  await transferInProgress.save();
  console.log(`all done`);
};

const withdrawFromSourceAccount = async (
  transferAmount: number,
  sourceAccountId: string,
): Promise<boolean> => {
  return true;
};

const transferToDestinationAccount = async (
  transferAmount: number,
  destinationAccountId: string,
): Promise<boolean> => {
  return true;
};

const startProcessingQueue = async () => {
  await AppDataSource.initialize();
  console.log(`Starting to listen for items on the queue`);
  const worker = new Worker(
    "transfer-queue",
    async (job: Job) => {
      // Optionally report some progress
      try {
        processQueueItem(job);
      } catch (err) {
        // rut roh got a lot of cleanup to do
      }
    },
    {
      connection: {
        host: process.env.REDIS_HOST ?? "127.0.0.1",
        port: parseInt(process.env.REDIS_HOST ?? "6379"),
      },
      removeOnComplete: { count: 0 },
    },
  );

  worker.on("completed", (job: Job, returnvalue: any) => {
    console.log(`Completed`);
  });
};

startProcessingQueue();
