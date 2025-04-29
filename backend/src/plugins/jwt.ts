import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";
import { z } from "zod";
import jwt from "jsonwebtoken";

const RefreshTokenPayloadSchema = z
  .object({
    userId: z.string().min(1, "userId must not be empty"),
    iat: z.number().min(10000000, "invalid token creation time"),
    exp: z.number().min(10000000, "invalid token expiration time"),
  })
  .strict();

async function jwtPlugin(fastify: FastifyInstance) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET  is not defined in environment variables");
  }
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error(
      "REFRESH_TOKEN_SECRET  is not defined in environment variables"
    );
  }

  const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
    cookie: { cookieName: "accessToken", signed: false },
    formatUser: function (user) {
      return { email: user.email, username: user.username };
    },
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
        reply.code(401).send({ message: "Invalid or expired token" });
      }
    }
  );

  fastify.decorate(
    "verifyRefreshJWT",
    async function (
      this: FastifyInstance,
      request: FastifyRequest,
      reply: FastifyReply
    ) {
      try {
        const token = request.cookies.refreshToken;
        if (!token) throw new Error("Refresh token missing");

        const decoded = jwt.verify(token, REFRESH_SECRET);

        const validatedPayload = RefreshTokenPayloadSchema.safeParse(decoded);
        if (!validatedPayload.success) {
          throw new Error(validatedPayload.error.message);
        }

        request.refreshUser = validatedPayload.data;
      } catch (error) {
        reply.code(401).send({ message: "Invalid or expired refresh token" });
      }
    }
  );
}
export default fp(jwtPlugin);
