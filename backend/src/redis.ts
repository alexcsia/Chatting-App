import Redis from "ioredis";

export const pub = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
export const sub = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
