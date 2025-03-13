import { FastifyRequest, FastifyReply } from "fastify";
import { newMessageRequest } from "@api/routes/schemas/newMessage.schema";
import { Message } from "models/Message";

export const createMessageController = async (
  request: FastifyRequest<{ Body: newMessageRequest }>,
  reply: FastifyReply
) => {
  const username = request.user.username;
  const { content, chatId } = request.body;

  const newMessage = await Message.create({
    authorUsername: username,
    content: content,
    chatId: chatId,
    timeStamp: Date.now(),
  });

  reply.send(newMessage);
};
