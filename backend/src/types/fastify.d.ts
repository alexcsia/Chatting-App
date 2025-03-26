import { FastifyInstance } from "fastify";
import { JwtPayload } from "../plugins/jwt";
import { unknown } from "zod";

declare module "fastify" {
  interface FastifyInstance {
    signJWT: (username: string, email: string) => Promise<string>;
    verifyJWT: <T = unknown>(
      request: FastifyRequest<any>,
      reply: FastifyReply
    ) => Promise<void>;
    verifyRefreshJWT: (
      this: FastifyInstance,
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }

  interface FastifyRequest {
    refreshUser?: { userId: string };
  }
}
