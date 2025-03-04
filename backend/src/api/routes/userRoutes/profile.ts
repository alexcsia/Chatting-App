import { FastifyPluginAsync } from "fastify";
import { profileController } from "@api/controllers/profile";
import { profileRequestSchema } from "../schemas/profile.schema";
import { authService } from "@services/authServices/authService";

export const userRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/profile/:username",
    { schema: profileRequestSchema },
    profileController(authService(fastify))
  );
};
