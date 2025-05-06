import { FastifyRequest, FastifyReply } from "fastify";
import { cache, pub, sub } from "redisDb";

export const sseConnectController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const username = request.user.username;
  //create redis function
  await cache.sAdd("online-users", username);

  const pending = await cache.lRange(`pending-requests:${username}`, 0, -1);
  console.log("pending requests", pending);

  //create separate function for sending sse (user offline)
  for (let request in pending) {
    const { event, data } = JSON.parse(request);
    reply.sse({ event: event, data: JSON.stringify(data) });
  }

  await cache.del(`pending-requests:${username}`);

  //create separate function for sending sse (user online)
  const channel = `sse:${username}`;
  const handler = (msg: string) => {
    const { event, data } = JSON.parse(msg);
    reply.sse({ event, data: JSON.stringify(data) });
  };

  await sub.subscribe(channel, handler);

  const cleanup = async () => {
    await sub.unsubscribe(channel, handler);
    await cache.sRem("online-users", username);
    console.log(`client ${username} disconnected`);
    request.raw.removeListener("close", cleanup);
  };

  request.raw.on("close", cleanup);
};
