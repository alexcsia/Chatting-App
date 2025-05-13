import { FastifyReply, FastifyRequest } from "fastify";
import { getUserByUsername } from "@repositories/userRepo";
import { ApiError } from "@api/errors/ApiError";
import { presentUserInfo } from "./presenters/userInfoPresenter";

export const userInfoController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const userFromJwt = request.user;
    if (!userFromJwt) throw new ApiError(401, "Unauthorised");

    const user = await getUserByUsername(userFromJwt.username);
    if (!user) throw new ApiError(404, "User not found");

    reply.status(200).send(presentUserInfo(user));
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      reply.status(error.status).send({ message: error.message });
    } else {
      console.error("Unexpected error:", error);
      return reply.status(500).send({ error: "An unexpected error occurred" });
    }
  }
};
