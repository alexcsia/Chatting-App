import { Socket } from "socket.io";
import { messageSchema } from "websockets/validation/message.schema";
import redisUtils from "redis";

export function sendMessage(socket: Socket) {
  return (receivedMessage: any) => {
    const result = messageSchema.safeParse(receivedMessage);

    if (!result.success) {
      console.error("invalid message format", result.error.format());
      return;
    }

    const message = result.data;

    console.log("Message received:", message);

    redisUtils.publishToRedis(message);
  };
}
