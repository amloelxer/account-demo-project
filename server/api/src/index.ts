import express from "express";
import "dotenv/config";
import AppDataSource from "./data-source";
import cors from "cors"
import { transferRouter } from "./routes/transfer/transfer";

const startApp = async () => {
  const app = express();
  // Allows the API to be hit from any URL. Necessary if fetching from another origin
  app.use(cors())
  app.use(express.json());
  app.use(transferRouter);
  const port = 3001;
  try {
    await AppDataSource.initialize();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error(`Could not initialize app with error`, err);
  }
};

startApp();
