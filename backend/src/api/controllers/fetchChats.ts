import { FastifyRequest, FastifyReply } from "fastify";
import chatService from "@services/chatService";

export const fetchUserChatsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const user = request.user.username;
  const chatList = await chatService.fetchChatIds(user);

  reply.send(chatList);
};
