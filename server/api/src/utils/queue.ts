import { Queue, Worker } from 'bullmq'

export const transferQueue = new Queue('transfer-queue', { connection: {
  host: "127.0.0.1",
  port: 6379
}});