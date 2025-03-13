import { FastifyRequest, FastifyReply } from "fastify";
import { Message } from "models/Message";
import { fetchMessagesQuery } from "@api/routes/schemas/fetchMessages.schema";

export const fetchChatMessagesController = async (
  request: FastifyRequest<{ Querystring: fetchMessagesQuery }>,
  reply: FastifyReply
) => {
  const { chatId } = request.query;
  const messageList = await Message.find({ chatId: chatId });

  reply.send(messageList);
};
