import { FastifyRequest, FastifyReply } from "fastify";
import { fetchMessagesQuery } from "@api/routes/schemas/fetchMessages.schema";
import chatService from "@services/chatServices";

export const fetchChatMessagesController = async (
  request: FastifyRequest<{ Params: fetchMessagesQuery }>,
  reply: FastifyReply
) => {
  const { chatId } = request.params;

  const messageList = await chatService.fetchChatMessages(chatId);

  reply.send(messageList);
};
