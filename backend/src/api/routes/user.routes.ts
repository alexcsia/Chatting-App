import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { userInfoController } from "@api/controllers/userInfo";
import { basicAuthSchema } from "./schemas/basicAuth.schema";

export const userRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  fastify.get(
    "/user-info",
    { schema: basicAuthSchema, onRequest: [fastify.verifyJWT] },
    userInfoController
  );
};
