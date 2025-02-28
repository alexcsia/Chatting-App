import { FastifyPluginAsync } from "fastify";
import { profileController } from "../../controllers/profile";
import { profileRequestSchema } from "../schemas/profile.schema";

export const userRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/profile/:userId",
    { schema: profileRequestSchema },
    profileController
  );
};
