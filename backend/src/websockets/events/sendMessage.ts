import { Socket } from "socket.io";
import { messageSchema } from "websockets/validation/message.schema";
import redisUtils from "redis";
import { FastifyInstance } from "fastify";

export function sendMessage(socket: Socket, fastify: FastifyInstance) {
  return (receivedMessage: any) => {
    const result = messageSchema.safeParse(receivedMessage);

    if (!result.success) {
      fastify.log.warn(
        { error: result.error.format() },
        "invalid message format"
      );
      return;
    }

    const message = result.data;
    fastify.log.info({ message }, "message received");

    redisUtils.publishToRedis(message);
  };
}
