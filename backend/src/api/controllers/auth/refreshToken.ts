import { ApiError } from "@api/errors/ApiError";
import { getUserByID } from "@repositories/userRepo";
import { AuthServiceType } from "@services/authServices/authService";
import { FastifyReply, FastifyRequest } from "fastify";
import { setAccessTokenCookie } from "./helpers/setAuthCookies";

export const refreshToken =
  (authService: AuthServiceType) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = request.refreshUser?.userId;

    if (!userId) throw new ApiError(500, "Invalid token");
    const user = await getUserByID(userId);

    const { generateAuthenticationTokens } = authService;
    if (!user) throw new ApiError(500, "");
    const tokens = await generateAuthenticationTokens(user, {
      refreshToken: false,
    });
    setAccessTokenCookie(tokens.accessJwt, reply);

    reply.send();
  };
