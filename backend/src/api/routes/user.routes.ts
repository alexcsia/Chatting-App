import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { userInfoController } from "@api/controllers/user/userInfo";
import { basicAuthSchema } from "./schemas/auth/basicAuth.schema";

export const userRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  fastify.get(
    "/user-info",
    { schema: basicAuthSchema, onRequest: [fastify.verifyJWT] },
    userInfoController
  );
};
