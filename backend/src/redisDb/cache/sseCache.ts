import { cache } from "redisDb";
import { ISSEPayload } from "redisDb/types/SSEPayload";

export const addToOnlineList = async (username: string) => {
  await cache.sAdd("online-users", username);
};

export const getPendingRequests = async (username: string) => {
  const pending = await cache.lRange(`pending-requests:${username}`, 0, -1);
  return pending;
};

export const deletePendingRequests = async (username: string) => {
  await cache.del(`pending-requests:${username}`);
};

export const removeFromOnlineList = async (username: string) => {
  await cache.sRem("online-users", username);
};

export const checkIfOnline = async (username: string) => {
  const isOnline = await cache.sIsMember("online-users", username);
  return isOnline;
};

export const addToPending = async (username: string, payload: ISSEPayload) => {
  await cache.rPush(`pending-requests:${username}`, JSON.stringify(payload));
};
