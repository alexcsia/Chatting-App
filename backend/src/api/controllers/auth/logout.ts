import { FastifyRequest, FastifyReply } from "fastify";
import { ApiError } from "@api/errors/ApiError";

export const logoutController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const isProduction = process.env.NODE_ENV == "production";
    reply.clearCookie("accessToken", {
      path: "/",
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      httpOnly: true,
    });

    reply.clearCookie("refreshToken", {
      path: "/",
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      httpOnly: true,
    });

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
