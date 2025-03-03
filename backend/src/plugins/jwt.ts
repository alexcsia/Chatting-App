import { FastifyInstance } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";

async function jwtPlugin(fastify: FastifyInstance) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
  });

  fastify.decorate("signJWT", async function (username: string, email: string) {
    return this.jwt.sign(
      { username, email },
      { expiresIn: "15m", algorithm: "HS384" }
    );
  });

  fastify.decorate("verifyJWT", async function (token: string) {
    return this.jwt.verify(token);
  });
}

export default fp(jwtPlugin);
