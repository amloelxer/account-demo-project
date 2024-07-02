import { Router, Request, Response } from "express";
import { submitTransferTransaction } from "./submitTransferTransaction";
import { getAllTransactionsForInvestor } from "./getAllTransactions";

export const transferRouter = Router();

transferRouter.post("/submitTransfer", submitTransferTransaction);
transferRouter.get("/transfers", getAllTransactionsForInvestor);
