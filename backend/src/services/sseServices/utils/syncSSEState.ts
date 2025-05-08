import {
  addToOnlineList,
  deletePendingRequests,
  getPendingRequests,
} from "redisDb/cache/sseCache";

export const fetchAndClearPendingEvents = async (username: string) => {
  await addToOnlineList(username);

  const pending = await getPendingRequests(username);

  deletePendingRequests(username);

  return pending.map((event) => JSON.parse(event));
};
