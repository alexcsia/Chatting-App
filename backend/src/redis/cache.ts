import { IMessage } from "@models/Message";
import { cache } from "redis";

export const cacheMessages = async (chatId: string, messages: IMessage[]) => {
  await cache.set(
    `chat:messages:${chatId}`,
    JSON.stringify(messages),
    "EX",
    60 * 5
  ); //5 mins
};
