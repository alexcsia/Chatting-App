import { sub } from "redisDb";
import { IMessage } from "@models/Message";

let subscribed = false;
const sseHandlers = new Map<string, (msg: string) => void>();

export const subscribeRedis = (callback: (message: IMessage) => void) => {
  if (subscribed) return;
  subscribed = true;

  sub.subscribe("chat", (rawMessage) => {
    const message: IMessage = JSON.parse(rawMessage);
    callback(message);
  });

  console.log("subscribed to redis channel");
};

export const subscribeSSE = (
  username: string,
  callback: (event: string, data: string) => void
) => {
  const channel = `sse:${username}`;

  if (sseHandlers.has(channel)) return;

  const handler = (payload: string) => {
    const { event, data } = JSON.parse(payload);
    callback(event, data);
  };

  sseHandlers.set(channel, handler);
  sub.subscribe(channel, handler);
};

export const unsubscribeSSE = async (username: string) => {
  const channel = `sse:${username}`;
  const handler = sseHandlers.get(channel);
  if (handler) {
    await sub.unsubscribe(channel, handler);
    sseHandlers.delete(channel);
  }
};
