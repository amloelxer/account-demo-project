import { Request, Response } from "express";
import Transfer from "../../entities/transfer";
import User from "../../entities/user";
import Account from "../../entities/account";
import { In } from "typeorm";

export const getAllTransfersForUser = async (
  request: Request,
  response: Response,
) => {

  // do auth to pull the user id
  const investorId: string | null = request.body?.investorId;

  if (!investorId) {
    return response.status(400).send({
      message: "Investor ID is invalid",
    });
  }

  try {
    const foundUser= await User.findOneBy({
      id: investorId,
    });

    if (!foundUser) {
      return response.status(404).send({
        message: "Could not locate Fund or Investor",
      });
    }

    const foundAccounts = await Account.find({
      where: {
        user: foundUser,
      }
    })

    const arrayOfAccountIds = foundAccounts.map(account => account.id)
    const transfers = await Transfer.find({
      where: {
        sourceAccountId: In(arrayOfAccountIds),
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

export const getTransferForId = async (
  request: Request,
  response: Response,
) => {
  const transferId: string | null = request.params?.id;

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
