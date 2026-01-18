import dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();

let redis = null;

if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 1,     // stop retry storms
    retryStrategy: () => null,   // no infinite reconnect
    enableOfflineQueue: false,   // don't queue commands
    tls: {},                     // required for rediss://
  });

  redis.on("connect", () => {
    console.log("Redis connected");
  });

  redis.on("error", (err) => {
    console.error("Redis error, disabling Redis:", err.message);
    redis = null;
  });
} else {
  console.log("Redis disabled: no REDIS_URL");
}

export { redis };
