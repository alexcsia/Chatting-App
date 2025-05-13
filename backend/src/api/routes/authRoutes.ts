import { FastifyInstance, FastifyPluginAsync } from "fastify";
import auth from "./auth";

export const authRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  auth.loginRoute(fastify);
  auth.registerRoute(fastify);
  auth.refreshTokenRoute(fastify);
  auth.logoutRoute(fastify);
};
