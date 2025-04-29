import { FastifyInstance } from "fastify";
import { signRefreshJWT } from "@helpers/jwtUtils/signRefreshJWT";

export const generateAuthenticationTokens = async (
  fastify: FastifyInstance,
  user: { username: string; email: string; userId: string },
  options: { refreshToken: boolean }
): Promise<{ accessJwt: string; refreshJwt?: string }> => {
  const accessJwt = await fastify.signJWT(user.username, user.email);

  if (options.refreshToken) {
    const refreshJwt = await signRefreshJWT(user.userId);
    return { accessJwt, refreshJwt };
  }

  return { accessJwt };
};
