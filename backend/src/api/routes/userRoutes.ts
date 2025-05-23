import { FastifyInstance, FastifyPluginAsync } from "fastify";
import user from "./user";

export const userRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  user.userInfoRoute(fastify);
  user.resolveFriendReqRoute(fastify);
  user.findUsersRoute(fastify);
  user.sendFriendReq(fastify);
};
