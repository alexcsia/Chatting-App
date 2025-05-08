import sseServices from "@services/sseServices";
import { FastifyRequest, FastifyReply } from "fastify";
import { cache, pub, sub } from "redisDb";
import { removeFromOnlineList } from "redisDb/cache/sseCache";
import { subscribeSSE, unsubscribeSSE } from "redisDb/sub/sub";

export const sseConnectController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const username = request.user.username;

    const requests = await sseServices.fetchAndClearPendingEvents(username);

    for (const { event, data } of requests) {
      reply.sse({ event, data: JSON.stringify(data) });
    }

    const handler = (data: string, event: string) => {
      reply.sse({ event, data: JSON.stringify(data) });
    };

    subscribeSSE(username, handler);

    const cleanup = async () => {
      unsubscribeSSE(username, handler);
      await removeFromOnlineList(username);
      request.raw.removeListener("close", cleanup);
    };

    request.raw.on("close", cleanup);
  } catch (error: unknown) {
    reply.code(500).send({ error: "SSE connection failed" });
  }
};
