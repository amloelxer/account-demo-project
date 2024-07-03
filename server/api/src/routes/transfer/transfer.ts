import { Router } from "express";
import { submitTransferTransaction } from "../../controllers/transfers/submitTransferTransaction";
import {
  getAllTransfersForUser,
  getTransferForId,
} from "../../controllers/transfers/getTransfers";
import { authMiddleware } from "../../middleware/auth";

export const transferRouter = Router();

transferRouter.post(
  "/submitTransfer",
  authMiddleware,
  submitTransferTransaction,
);
transferRouter.get("/transfers", authMiddleware, getAllTransfersForUser);
transferRouter.get("/transfers/:id", authMiddleware, getTransferForId);
