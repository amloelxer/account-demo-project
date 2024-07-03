import { Request, Response, NextFunction } from "express";
import { sendApiResponse, API_RESPONSE_CODE } from "../utils/apiResponse";

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const canContinue = await isValidRequest(request);
  if (canContinue) {
    next();
    return;
  } else {
    sendApiResponse({
        request,
        response,
        responseCode: API_RESPONSE_CODE.UNAUTHORIZED
    })
  }
};

const isValidRequest = (request: Request): Promise<true> => {
  // parse some cookie or header from the request
  // validate it either ourselves or some from third party (Cognito, Auth0 etc etc)
  return new Promise((resolve, reject) => {
    resolve(true);
  });
};
