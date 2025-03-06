import { FastifyInstance } from "fastify";
import { JwtPayload } from "../plugins/jwt";
declare module "fastify" {
  interface FastifyInstance {
    signJWT: (username: string, email: string) => Promise<string>;
    verifyJWT: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    userInfo?: {
      email: string;
      username: string;
    };
  }
}
