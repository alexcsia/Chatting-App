import { pub } from "redisDb";
import { ISSEPayload } from "redisDb/types/SSEPayload";
import { ChatMessage } from "websockets/validation/message.schema";

export const publishToRedis = (message: ChatMessage) => {
  pub.publish("chat", JSON.stringify(message));
};

export const publishEvent = async (username: string, payload: ISSEPayload) => {
  await pub.publish(`sse:${username}`, JSON.stringify(payload));
};
