import { ApiError } from "@api/errors/ApiError";
import { IBasicFriendReq } from "@api/routes/schemas/user/addFriend.schema";
import userServices from "@services/userServices";
import { FastifyReply, FastifyRequest } from "fastify";

export const resolveFriendReqController = async (
  request: FastifyRequest<{ Body: IBasicFriendReq }>,
  reply: FastifyReply
) => {
  try {
    const requestingUser = request.user.username;

    const userToAdd = request.body.username;

    await userServices.addUserToFriendList(requestingUser, userToAdd);
    reply.status(200).send({ message: "Friend added" });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      reply.status(error.status).send({ message: error.message });
    } else {
      console.error("Unexpected error:", error);
      return reply.status(500).send({ error: "An unexpected error occurred" });
    }
  }
};
