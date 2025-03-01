import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    signJWT: (username: string, email: string) => Promise<string>;
    verifyJWT: (token: string) => Promise<object>;
  }
}
