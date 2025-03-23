import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { profileRequestSchema } from "./schemas/profile.schema";
import { profileController } from "@api/controllers/profile";
import { userInfoController } from "@api/controllers/userInfo";
import { basicAuthSchema } from "./schemas/basicAuth.schema";

export const userRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  fastify.get(
    "/profile/:username",
    {
      schema: profileRequestSchema,
      onRequest: [fastify.verifyJWT],
    },
    profileController
  );

  fastify.get(
    "/user-info",
    { schema: basicAuthSchema, onRequest: [fastify.verifyJWT] },
    userInfoController
  );
};
