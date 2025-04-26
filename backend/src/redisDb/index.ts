import { createClient } from "redis";
import { publishToRedis } from "./pub";
import { subscribeRedis } from "./sub";

const pub = createClient({ url: process.env.REDIS_URL });
const sub = createClient({ url: process.env.REDIS_URL });
const cache = createClient({ url: process.env.REDIS_URL });

[pub, sub, cache].forEach((client) => {
  client.on("error", (err) => {
    console.error(
      `redis ${
        client === pub ? "publisher" : client === sub ? "subscriber" : "cache"
      } client error:`,
      err
    );
  });
});

async function connectRedis() {
  await Promise.all([pub.connect(), sub.connect(), cache.connect()]);
  console.log("all redis clients connected");
}

export { pub, sub, cache, connectRedis };
export default { publishToRedis, subscribeRedis };
