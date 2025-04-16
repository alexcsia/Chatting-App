import Redis from "ioredis";
import { publishToRedis } from "./pub";
import { subscribeRedis, receiveMessage } from "./sub";

export const pub = new Redis(
  process.env.REDIS_URL || "redis://172.23.163.25:6379"
);
export const sub = new Redis(
  process.env.REDIS_URL || "redis://172.23.163.25:6379"
);

export default { publishToRedis, subscribeRedis, receiveMessage };
