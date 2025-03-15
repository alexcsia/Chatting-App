import { newChatRequest } from "@api/routes/schemas/newChat.schema";
import chatServices from "@services/chatServices";
import { FastifyRequest, FastifyReply } from "fastify";

export const createChatController = async (
  request: FastifyRequest<{ Body: newChatRequest }>,
  reply: FastifyReply
) => {
  const requestingUser = request.user.username;

  const targetUser = request.body.username;
  const chat = await chatServices.createChat(requestingUser, targetUser);

  reply.send({ chatId: chat._id });
};
