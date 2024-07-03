import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import RedisClient from "ioredis";

// Create a `ioredis` client
const client = new RedisClient();

// Create and use the rate limiter
export const rateLimiter = rateLimit({
  // Rate limiter configuration
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers

  // Redis store configuration
  store: new RedisStore({
    // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
    sendCommand: (...args: string[]) => client.call(...args),
  }),
});
