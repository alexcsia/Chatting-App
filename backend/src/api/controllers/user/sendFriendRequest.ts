import { IBasicFriendReq } from "@api/routes/schemas/user/addFriend.schema";
import { FastifyRequest, FastifyReply } from "fastify";
import { ApiError } from "@api/errors/ApiError";
import userServices from "@services/userServices";

export const sendFriendReqController = async (
  request: FastifyRequest<{ Body: IBasicFriendReq }>,
  reply: FastifyReply
) => {
  try {
    const requestingUser = request.user.username;
    const targetUser = request.body.username;

    await userServices.sendFriendRequest(requestingUser, targetUser);

    reply.status(200).send({ message: "Friend request sent" });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      reply.status(error.status).send({ message: error.message });
    } else {
      console.error("Unexpected error:", error);
      return reply.status(500).send({ error: "An unexpected error occurred" });
    }
  }
};
