import { FastifyRequest, FastifyReply } from "fastify";
import { ApiError } from "@api/errors/ApiError";
import { findUsersQuery } from "@api/routes/schemas/user/findUsers.schema";
import userServices from "@services/userServices";

export const findUsersController = async (
  request: FastifyRequest<{ Querystring: findUsersQuery }>,
  reply: FastifyReply
) => {
  try {
    const usersToFind = request.query.username;

    const userList = await userServices.findUsers(usersToFind);

    reply.send(userList);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      reply.status(error.status).send({ message: error.message });
    } else {
      console.error("Unexpected error:", error);
      return reply.status(500).send({ error: "An unexpected error occurred" });
    }
  }
};
