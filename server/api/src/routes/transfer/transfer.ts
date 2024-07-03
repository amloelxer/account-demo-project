import { Router, Request, Response } from "express";
import { submitTransferTransaction } from "./submitTransferTransaction";
import { getAllTransfersForUser, getTransferForId } from "./getTransfers";
import { authMiddleware } from "../../middleware/auth";

export const transferRouter = Router();

transferRouter.post("/submitTransfer", authMiddleware, submitTransferTransaction);
transferRouter.get("/transfers", authMiddleware, getAllTransfersForUser);
transferRouter.get("/transfers/:id", authMiddleware, getTransferForId);
