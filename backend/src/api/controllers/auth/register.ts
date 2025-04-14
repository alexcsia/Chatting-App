import { FastifyReply, FastifyRequest } from "fastify";
import { ApiError } from "@api/errors/ApiError";
import { registrationRequest } from "@api/routes/schemas/auth/register.schema";
import { AuthServiceType } from "@services/authServices/authService";

export const registerController =
  (authService: AuthServiceType) =>
  async (
    request: FastifyRequest<{ Body: registrationRequest }>,
    reply: FastifyReply
  ) => {
    try {
      const { username, email, password } = request.body;

      await authService.registerUser(username, email, password);
      reply.send("received");
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        reply.status(error.status).send({ message: error.message });
      } else {
        console.error("Unexpected error:", error);
        return reply
          .status(500)
          .send({ error: "An unexpected error occurred" });
      }
    }
  };
