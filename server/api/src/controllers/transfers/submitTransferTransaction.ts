import { Request, Response } from "express";
import Transfer from "../../entities/transfer";
import { transferQueue } from "../../utils/transferQueue";
import Account from "../../entities/account";
import { API_RESPONSE_CODE, sendApiResponse } from "../../utils/apiResponse";
interface TransferInput {
  sourceAccount: Account;
  destinationAccount: Account;
  transferAmount: number;
}

export const submitTransferTransaction = async (
  request: Request,
  response: Response,
) => {
  const accountSourceID = request?.body?.accountSourceId;
  const accountDestinationID = request?.body?.accountDestinationId;
  const transferAmount: number | null = request.body?.transferAmount;

  const responseObject = {
    response,
    request,
  };

  if (!accountSourceID || !accountDestinationID || !transferAmount) {
    return sendApiResponse({
      ...responseObject,
      responseCode: API_RESPONSE_CODE.BAD_REQUEST,
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
      return sendApiResponse({
        ...responseObject,
        responseCode: API_RESPONSE_CODE.NOT_FOUND,
        message: "Could not locate source account or destination account",
      });
    }

    // submit item to queue
    const transferId = await submitTransferAndSubmitToQueue({
      sourceAccount,
      destinationAccount,
      transferAmount,
    });
    return sendApiResponse({
      ...responseObject,
      responseCode: API_RESPONSE_CODE.ACCEPTED,
      payload: {
        transferId,
      },
    });
  } catch (err) {
    return sendApiResponse({
      ...responseObject,
      responseCode: API_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      error: err,
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
  transfer.destinationAccountId = input.destinationAccount.id;
  transfer.sourceAccountId = input.sourceAccount.id;
  const savedTransfer = await transfer.save();
  // send to queue
  await transferQueue.add(
    savedTransfer.id,
    {},
    {
      removeOnComplete: true,
      jobId: savedTransfer.id,
    },
  );
  return savedTransfer.id;
};
