import { FastifyInstance } from "fastify";
import fastifyJwt from "@fastify/jwt";

export default async function jwtPlugin(fastify: FastifyInstance) {
  fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET || "default" });

  fastify.decorate(
    "signJWT",
    async function (this: FastifyInstance, username: string, email: string) {
      return this.jwt.sign(
        { username, email },
        { expiresIn: "15m", algorithm: "HS256" }
      );
    }
  );

  fastify.decorate(
    "verifyJWT",
    async function (this: FastifyInstance, token: string) {
      return this.jwt.verify(token);
    }
  );
}
