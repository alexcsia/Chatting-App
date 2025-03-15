import { FastifyRequest, FastifyReply } from "fastify";
import { Chat } from "@models/Chat";
import { User } from "@models/User";

export const fetchUserChatsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const user = await User.findOne({ username: request.user.username });
  if (!user) {
    return reply.status(404).send({ error: "User not found" });
  }
  console.log(user.username);

  const chatList = await Chat.find({ userIds: { $in: [user._id] } });
  console.log("chat list:", chatList);
  reply.send(chatList);
};
