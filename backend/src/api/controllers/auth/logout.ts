import { FastifyRequest, FastifyReply } from "fastify";
import { ApiError } from "@api/errors/ApiError";

export const logoutController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    reply.clearCookie("accessToken", { path: "/" });
    reply.clearCookie("refreshToken", { path: "/" });

    return reply.status(200).send({ message: "Logout successful" });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      reply.status(error.status).send({ message: error.message });
    } else {
      console.error("Unexpected error:", error);
      return reply.status(500).send({ error: "An unexpected error occurred" });
    }
  }
};
