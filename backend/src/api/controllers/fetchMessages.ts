import { FastifyRequest, FastifyReply } from "fastify";
import { fetchMessagesQuery } from "@api/routes/schemas/fetchMessages.schema";
import chatService from "@services/chatServices";

export const fetchChatMessagesController = async (
  request: FastifyRequest<{ Params: fetchMessagesQuery }>,
  reply: FastifyReply
) => {
  const { chatId } = request.params;

  const messageList = await chatService.fetchChatMessages(chatId);
  console.log("message list controller:", messageList);

  reply.send(messageList);
};
