import sseServices from "@services/sseServices";
import { FastifyRequest, FastifyReply } from "fastify";
import { removeFromOnlineList } from "redisDb/cache/sseCache";
import { subscribeSSE, unsubscribeSSE } from "redisDb/sub/sub";

export const sseConnectController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const username = request.user.username;

    reply.raw.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    const requests = await sseServices.fetchAndClearPendingEvents(username);
    for (const { event, data } of requests) {
      reply.sse({ event, data: JSON.stringify(data) });
    }

    const handler = (event: string, data: any) => {
      reply.sse({ event, data: JSON.stringify(data) });
    };

    subscribeSSE(username, handler);

    const cleanup = async () => {
      await unsubscribeSSE(username);
      await removeFromOnlineList(username);
    };

    request.raw.on("close", cleanup);
    request.raw.on("end", cleanup);

    request.socket.on("close", cleanup);
  } catch (error) {
    console.error("SSE connection error:", error);
    reply.code(500).send({ error: "SSE connection failed" });
  }
};
