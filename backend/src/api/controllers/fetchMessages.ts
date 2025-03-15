import { FastifyRequest, FastifyReply } from "fastify";
import { fetchMessagesQuery } from "@api/routes/schemas/fetchMessages.schema";
import chatService from "@services/chatService";

export const fetchChatMessagesController = async (
  request: FastifyRequest<{ Querystring: fetchMessagesQuery }>,
  reply: FastifyReply
) => {
  const { chatId } = request.query;

  const messageList = await chatService.fetchChatMessages(chatId);

  reply.send(messageList);
};
