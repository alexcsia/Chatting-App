import { FastifyInstance } from "fastify";
import { signJWT } from "../../../helpers/jwtUtils/signJWT";
import { signRefreshJWT } from "../../../helpers/jwtUtils/signRefreshJWT";

export const generateTokens = async (
  fastify: FastifyInstance,
  user: { username: string; email: string }
) => {
  const accessJwt = await signJWT(user.username, user.email, fastify);

  const refreshJwt = await signRefreshJWT(user.username, user.email);

  return { accessJwt, refreshJwt };
};
