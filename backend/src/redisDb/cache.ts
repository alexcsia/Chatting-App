import { IMessage } from "@models/Message";
import { cache } from "redisDb";

export const cacheMessages = async (chatId: string, messages: IMessage[]) => {
  await cache.set(`chat:messages:${chatId}`, JSON.stringify(messages), {
    EX: 60 * 5,
  });
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

export const updateCachedMessages = async (
  chatId: string,
  newMessage: IMessage
) => {
  const cached = await getCachedMessages(chatId);

  if (!cached) return;

  if (!cached.some((msg) => msg._id === newMessage._id)) {
    const updatedCache = [...cached, newMessage];
    await cache.set(`chat:messages:${chatId}`, JSON.stringify(updatedCache), {
      EX: 60 * 5,
    });
  }
};
