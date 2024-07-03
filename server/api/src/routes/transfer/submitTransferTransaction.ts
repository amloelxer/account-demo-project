import { Request, Response } from "express";
import Transfer from "../../entities/transfer";
import { transferQueue } from "../../utils/transferQueue";
import Account from "../../entities/account";

interface TransferInput {
  sourceAccount: Account;
  destinationAccount: Account;
  transferAmount: number;
}

export const submitTransferTransaction = async (
  request: Request,
  response: Response,
) => {
  // validate we have both users
  // const fundId: string | null = request?.body?.fundId;
  // const investorId: string | null = request.body?.investorId;
  const accountSourceID = request?.body?.accountSourceID;
  const accountDestinationID = request?.body?.accountSourceID;
  const transferAmount: number | null = request.body?.transferAmount;

  // validate whomever is calling this is authenticated
  if (!accountSourceID || !accountDestinationID || !transferAmount) {
    return response.status(400).send({
      message: "Fund ID, partner ID, or transfer amount are invalid ",
    });
  }

  try {
    const sourceAccount = await Account.findOneBy({
      id: accountSourceID,
    });

    const destinationAccount = await Account.findOneBy({
      id: accountDestinationID,
    });

    if (!sourceAccount || !destinationAccount) {
      return response.status(404).send({
        message: "Could not locate Fund or Investor",
      });
    }

    // submit item to queue
    const transferId = await submitTransferAndSubmitToQueue({
      sourceAccount,
      destinationAccount,
      transferAmount,
    });
    response.status(202).send({
      transferId,
    });
  } catch (err) {
    response.status(500).send({
      message: "Internal Server error",
    });
  }
};

const submitTransferAndSubmitToQueue = async (
  input: TransferInput,
): Promise<string> => {
  const transfer = new Transfer();
  // transfer. = input.sourceAccount;
  // transfer.destination = input.fund;
  transfer.transferAmount = input.transferAmount;
  const savedTransfer = await transfer.save();
  // send to queue
  await transferQueue.add(savedTransfer.id, "stuff", {
    removeOnComplete: true,
    jobId: savedTransfer.id,
  });
  return savedTransfer.id;
};
