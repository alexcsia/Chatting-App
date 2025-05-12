if (process.env.NODE_ENV !== "production") {
  require("tsconfig-paths/register");
  require("module-alias/register");
}
import dotenv from "dotenv";
dotenv.config();

import Fastify, { FastifyInstance } from "fastify";
import { connectMongoDB } from "./database";
import apiRoutes from "@api/routes";
import cookie from "@fastify/cookie";
import jwtPlugin from "./plugins/jwt";
import { setupWebsocketServer } from "./websockets/websocketServer";
import cors from "@fastify/cors";
import { connectRedis } from "redisDb";
import FastifySSEPlugin from "fastify-sse-v2";

const PORT = parseInt(process.env.PORT || "3000");

const fastify: FastifyInstance = Fastify({ logger: false });

const start = async () => {
  try {
    await fastify.register(cookie);
    await fastify.register(jwtPlugin);
    fastify.register(FastifySSEPlugin);

    if (process.env.ENABLE_CORS === "true") {
      fastify.register(cors, {
        origin:
          process.env.NODE_ENV === "production"
            ? process.env.CORS_ORIGIN
            : "http://localhost:8080",
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        credentials: true,
        preflightContinue: true,
      });
    }

    await fastify.register(apiRoutes, { prefix: "/api" });
    await connectMongoDB();
    await connectRedis();

    setupWebsocketServer(fastify);

    await fastify.listen({
      port: PORT,
      host: "0.0.0.0",
    });
    console.log("Fastify listening on port", PORT);
  } catch (err) {
    fastify.log.error(err);
    if (process.env.NODE_ENV == "production") process.exit(1);
  }
};

start();

export default fastify;
