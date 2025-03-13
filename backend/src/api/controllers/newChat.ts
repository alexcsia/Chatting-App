import { newChatRequest } from "@api/routes/schemas/newchat.schema";
import { FastifyRequest, FastifyReply } from "fastify";
import { Chat } from "models/Chat";
import { User } from "models/User";

export const newChatController = async (
  request: FastifyRequest<{ Body: newChatRequest }>,
  reply: FastifyReply
) => {
  const userFromRequest = request.user.username;
  const userFromReqId = await User.findOne({ username: userFromRequest });

  const userToText = request.body.username;
  const userToTextId = await User.findOne({ username: userToText });

  const newChat = await Chat.create({ userIds: [userFromReqId, userToTextId] });

  reply.send({ chat: newChat._id });
};
