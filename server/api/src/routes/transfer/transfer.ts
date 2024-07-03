import { Router, Request, Response } from "express";
import { submitTransferTransaction } from "./submitTransferTransaction";
import { getAllTransfersForUser, getTransferForId } from "./getTransfers";

export const transferRouter = Router();

transferRouter.post("/submitTransfer", submitTransferTransaction);
transferRouter.get("/transfers", getAllTransfersForUser);
transferRouter.get("/transfers/:id", getTransferForId);
