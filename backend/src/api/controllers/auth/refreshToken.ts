import { ApiError } from "@api/errors/ApiError";
import { getUserByID } from "@repositories/userRepo";
import { AuthServiceType } from "@services/authServices/authService";
import { FastifyReply, FastifyRequest } from "fastify";
import { setAccessTokenCookie } from "./helpers/setAuthCookies";

export const refreshTokenController =
  (authService: AuthServiceType) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const userId = request.refreshUser?.userId;

      if (!userId) throw new ApiError(500, "Invalid token");
      const user = await getUserByID(userId);

      const { generateAuthenticationTokens } = authService;

      if (!user) throw new ApiError(500, "User not found");

      const tokens = await generateAuthenticationTokens(user, {
        refreshToken: false,
      });
      setAccessTokenCookie(tokens.accessJwt, reply);

      reply.send();
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
