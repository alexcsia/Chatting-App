import { sub } from "redisDb";
import { IMessage } from "@models/Message";

let subscribed = false;

export const subscribeRedis = (callback: (message: IMessage) => void) => {
  if (subscribed) return;
  subscribed = true;

  sub.subscribe("chat", (rawMessage) => {
    const message: IMessage = JSON.parse(rawMessage);
    console.log("redis sub message:", message);
    callback(message);
  });

  console.log("subscribed to redis channel");
};

export const subscribeSSE = (
  username: string,
  callback: (event: string, data: string) => void
) => {
  if (subscribed) return;
  subscribed = true;

  sub.subscribe(`sse:${username}`, (payload: string) => {
    const { event, data } = JSON.parse(payload);
    callback(event, data);
  });
};

export const unsubscribeSSE = async (
  username: string,
  callback: (event: string, data: string) => void
) => {
  await sub.unsubscribe(`sse:${username}`, callback);
};
