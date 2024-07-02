import { Request, Response } from "express";
import Investor from "../../entities/investor";
import Transfer from "../../entities/transfer";

export const getAllTransactionsForInvestor = async (
  request: Request,
  response: Response,
) => {
  const investorId: string | null = request.body?.investorId;

  if (!investorId) {
    return response.status(400).send({
      message: "Investor ID is invalid",
    });
  }

  try {
    const foundInvestor = await Investor.findOneBy({
      id: investorId,
    });

    if (!foundInvestor) {
      return response.status(404).send({
        message: "Could not locate Fund or Investor",
      });
    }

    const transfers = await Transfer.find({
      where: {
        source: foundInvestor,
      },
    });

    if (transfers.length < 1) {
      return response.status(404).send();
    }

    return response.status(200).send({
      transfers,
    });
  } catch (err) {
    response.status(500).send({
      message: "Internal Server error",
    });
  }
};

export const getTransaction = async (
  request: Request,
  response: Response,
) => {
  const transferId: string | null= request.params?.id

  if (!transferId) {
    return response.status(400).send({
      message: "Investor ID is invalid",
    });
  }

  try {
    const foundTransfer = await Transfer.findOneBy({
      id: transferId,
    });

    if (!foundTransfer) {
      return response.status(404).send({
        message: "Could not locate Fund or Investor",
      });
    }
    return response.status(200).send({
      foundTransfer,
    });
  } catch (err) {
    response.status(500).send({
      message: "Internal Server error",
    });
  }
};
