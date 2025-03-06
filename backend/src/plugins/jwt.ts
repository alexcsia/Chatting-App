import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";

async function jwtPlugin(fastify: FastifyInstance) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
    cookie: { cookieName: "accessToken", signed: false },
  });

  fastify.decorate(
    "signJWT",
    async function (this: FastifyInstance, username: string, email: string) {
      const token = this.jwt.sign(
        { username, email },
        { expiresIn: "15m", algorithm: "HS384" }
      );
      return token;
    }
  );

  fastify.decorate(
    "verifyJWT",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify({ onlyCookie: true });
      } catch (error) {
        console.error("JWT verification failed:", error);
        reply.code(401).send({ message: "Invalid or expired token" });
      }
    }
  );
}

export default fp(jwtPlugin);
