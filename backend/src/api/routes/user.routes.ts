import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { profileRequestSchema } from "./schemas/profile.schema";
import { profileController } from "@api/controllers/profile";

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
};
