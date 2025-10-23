import dotenv from "dotenv";
import Redis from "ioredis"

dotenv.config();

console.log("Loaded REDIS_URL:", process.env.REDIS_URL); // Debug line

export const redis = new Redis(process.env.REDIS_URL);

