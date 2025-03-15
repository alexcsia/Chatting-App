import { FastifyRequest, FastifyReply } from "fastify";
import { newMessageRequest } from "@api/routes/schemas/newMessage.schema";
import chatService from "@services/chatServices";

export const createMessageController = async (
  request: FastifyRequest<{ Body: newMessageRequest }>,
  reply: FastifyReply
) => {
  const authorUsername = request.user.username;
  const { content, chatId } = request.body;

  const newMessage = await chatService.createMessage(
    authorUsername,
    content,
    chatId
  );

  reply.send(newMessage);
};
