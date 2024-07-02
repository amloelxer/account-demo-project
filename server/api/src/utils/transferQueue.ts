import { Queue } from "bullmq";

export const transferQueue = new Queue("transfer-queue", {
  connection: {
    host: process.env.REDIS_HOST ?? "127.0.0.1",
    port: parseInt(process.env.REDIS_HOST ?? "6379"),
  },
});
