import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { loginRoute } from "./auth/login";
import { registerRoute } from "./auth/register";
import { refreshTokenRoute } from "./auth/refreshToken";

export const authRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  loginRoute(fastify);
  registerRoute(fastify);
  refreshTokenRoute(fastify);
};
