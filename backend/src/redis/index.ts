import Redis from "ioredis";
import { publishToRedis } from "./pub";
import { subscribeRedis, receiveMessage } from "./sub";

const redisURL = process.env.REDIS_URL || "redis://172.23.163.25:6379";

export const pub = new Redis(redisURL);
export const sub = new Redis(redisURL);
export const cache = new Redis(redisURL);

[pub, sub, cache].forEach((client) => {
  client.on("error", (err) => console.error("redis error:", err));
});

export default { publishToRedis, subscribeRedis, receiveMessage };
