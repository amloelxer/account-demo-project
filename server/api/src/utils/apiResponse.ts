import { Request, Response, NextFunction } from "express";

export enum API_RESPONSE_CODE {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  IM_A_TEAPOT = 418,
  INTERNAL_SERVER_ERROR = 500,
}

interface APIResponseInput {
  responseCode: API_RESPONSE_CODE;
  request: Request;
  response: Response;
  payload?: any;
  message?: string;
  error?: any;
}

export const sendApiResponse = (input: APIResponseInput) => {
  const { response, request, payload, message, error, responseCode } = input;
  if (error) {
    const errorMetadata = {
      error,
      body: request.body,
      headers: request.headers,
      url: request.url,
    };
    console.error(`An error occured`, errorMetadata);
  }

  response.status(responseCode).send({ message, payload });
};
