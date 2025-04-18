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

export const getCachedMessages = async (
  chatId: string
): Promise<IMessage[] | null> => {
  const messages = await cache.get(`chat:messages:${chatId}`);

  return messages ? JSON.parse(messages) : null;
};

export const deleteCachedMessages = async (chatId: string) => {
  await cache.del(`chat:messages:${chatId}`);
};
