import { Request, Response } from "express";
import Fund from "../../entities/fund";
import Investor from "../../entities/investor";
import Transfer from "../../entities/transfer";
import { transferQueue } from "../../utils/transferQueue";

interface TransferInput {
  fund: Fund;
  investor: Investor;
  transferAmount: number;
}

export const submitTransferTransaction = async (
  request: Request,
  response: Response,
) => {
  // validate we have both users
  const fundId: string | null = request?.body?.fundId;
  const investorId: string | null = request.body?.investorId;
  const transferAmount: number | null = request.body?.transferAmount;

  // validate whomever is calling this is authenticated
  if (!fundId || !investorId || !transferAmount) {
    return response.status(400).send({
      message: "Fund ID, partner ID, or transfer amount are invalid ",
    });
  }

  try {
    const foundInvestor = await Investor.findOneBy({
      id: investorId,
    });

    const foundFund = await Fund.findOneBy({
      id: fundId,
    });

    console.log(`the found fund id is ${foundFund?.id}`)
    console.log(`the found investor id is ${foundInvestor?.id}`)

    if (!foundInvestor || !foundFund) {
      return response.status(404).send({
        message: "Could not locate Fund or Investor",
      });
    }

    // submit item to queue
    const transferId = await submitTransferAndSubmitToQueue({
      fund: foundFund,
      investor: foundInvestor,
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
  transfer.source = input.investor;
  transfer.destination = input.fund;
  transfer.transferAmount = input.transferAmount;
  const savedTransfer = await transfer.save();
  // send to queue
  await transferQueue.add(savedTransfer.id, "stuff", { removeOnComplete: true, jobId: savedTransfer.id});
  return savedTransfer.id;
};
