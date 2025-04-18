import { FastifyRequest, FastifyReply } from "fastify";
import { fetchMessagesQuery } from "@api/routes/schemas/chat/fetchMessages.schema";
import chatService from "@services/chatServices";
import { cacheMessages } from "redis/cache";

export const fetchChatMessagesController = async (
  request: FastifyRequest<{ Params: fetchMessagesQuery }>,
  reply: FastifyReply
) => {
  const { chatId } = request.params;

  const messageList = await chatService.fetchChatMessages(chatId);

  await cacheMessages(chatId, messageList);

  reply.send(messageList);
};
