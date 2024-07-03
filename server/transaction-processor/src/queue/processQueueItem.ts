import Transfer, { TransactionStatus } from "../entities/transfer";
import { DateTime } from "luxon";
import Account from "../entities/account";
import {
  mockRestorePreviousFundState,
  mockTransferToDestinationAccount,
  mockWithdrawFromSourceAccount,
} from "../utils/mockTransfers";
import { Job } from "bullmq";

/**
 *
 * @param job a bull MQ job
 *
 * The main function for processing queue items
 */
export const processQueueItem = async (job: Job) => {
  const queuedTransfer = await Transfer.findOneBy({
    id: job.id,
  });

  if (!queuedTransfer) {
    throw new Error(`Could not find the queued transfer in the databse`);
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

  try {
    await transferFunds(transferAmount, sourceAccount, destinationAccount);
    transferInProgress.status = TransactionStatus.COMPLETED;
  } catch (err) {
    await mockRestorePreviousFundState(sourceAccount, destinationAccount);
    transferInProgress.status = TransactionStatus.FAILED;
    transferInProgress.failureReason = `${err}`;
  }

  transferInProgress.timeFinished = DateTime.now().toUTC().toJSDate();
  await transferInProgress.save();

  console.log(`Finished processing transfer: ${transferInProgress.id}`);
};

/**
 *
 * @param transferAmount
 * @param sourceAccount
 * @param destinationAccount
 *
 * Note that this must be atomic operation when it comes to transferring money.
 * We must able to complete, or need to revert any changes we made to the various accounts
 */
const transferFunds = async (
  transferAmount: number,
  sourceAccount: Account,
  destinationAccount: Account,
) => {
  await mockWithdrawFromSourceAccount(
    transferAmount,
    sourceAccount.externalAccountId,
  );

  await mockTransferToDestinationAccount(
    transferAmount,
    destinationAccount.externalAccountId,
  );
};
