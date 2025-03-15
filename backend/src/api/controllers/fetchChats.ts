import { FastifyRequest, FastifyReply } from "fastify";
import { fetchChatIds } from "@services/chatService/fetchChats";

export const fetchUserChatsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const user = request.user.username;
  const chatList = await fetchChatIds(user);

  reply.send(chatList);
};
