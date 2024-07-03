import { Request, Response } from "express";
import Transfer from "../../entities/transfer";
import User from "../../entities/user";
import Account from "../../entities/account";
import { In } from "typeorm";
import { API_RESPONSE_CODE, sendApiResponse } from "../../utils/apiResponse";

export const getAllTransfersForUser = async (
  request: Request,
  response: Response,
) => {
  // do auth to pull the user id
  const investorId: string | null = request.body?.investorId;

  const responseObject = {
    response,
    request,
  };

  if (!investorId) {
    return sendApiResponse({
      ...responseObject,
      responseCode: API_RESPONSE_CODE.BAD_REQUEST,
      message: "Investor ID is invalid",
    });
  }

  try {
    const foundUser = await User.findOne({
      where: {
        id: investorId,
      },
      relations: {
        financialEntity: true,
      },
    });

    if (!foundUser) {
      return sendApiResponse({
        ...responseObject,
        responseCode: API_RESPONSE_CODE.NOT_FOUND,
        message: "Could not locate Fund or Investor",
      });
    }

    const foundAccounts = await Account.find({
      where: {
        financialEntity: foundUser.financialEntity,
      },
    });

    const arrayOfAccountIds = foundAccounts.map((account) => account.id);
    const transfers = await Transfer.find({
      where: {
        sourceAccountId: In(arrayOfAccountIds),
      },
    });

    if (transfers.length < 1) {
      return sendApiResponse({
        ...responseObject,
        responseCode: API_RESPONSE_CODE.NOT_FOUND,
      });
    }

    return sendApiResponse({
      ...responseObject,
      responseCode: API_RESPONSE_CODE.OK,
      payload: transfers,
    });
  } catch (err) {
    return sendApiResponse({
      ...responseObject,
      responseCode: API_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getTransferForId = async (
  request: Request,
  response: Response,
) => {
  const transferId: string | null = request.params?.id;

  const responseObject = {
    response,
    request,
  };

  try {
    const foundTransfer = await Transfer.findOneBy({
      id: transferId,
    });

    if (!foundTransfer) {
      return sendApiResponse({
        ...responseObject,
        responseCode: API_RESPONSE_CODE.NOT_FOUND,
        message: `Could not locate transfer with transferID of ${transferId}`,
      });
    }

    return sendApiResponse({
      ...responseObject,
      responseCode: API_RESPONSE_CODE.OK,
      payload: foundTransfer,
    });
  } catch (err) {
    return sendApiResponse({
      ...responseObject,
      responseCode: API_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      error: err,
    });
  }
};
