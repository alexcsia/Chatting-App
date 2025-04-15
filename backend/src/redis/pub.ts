import { pub } from "redis";
import { ChatMessage } from "websockets/validation/message.schema";

export const publishToRedis = (message: ChatMessage) => {
  pub.publish("chat", JSON.stringify(message));
};
