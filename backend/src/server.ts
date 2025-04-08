if (process.env.NODE_ENV !== "production") {
  require("tsconfig-paths/register");
  require("module-alias/register");
}
import Fastify, { FastifyInstance } from "fastify";
import { connectMongoDB } from "./database";
import apiRoutes from "@api/routes";
import cookie from "@fastify/cookie";
import dotenv from "dotenv";
import jwtPlugin from "./plugins/jwt";
import { setupWebsocketServer } from "./websockets/websocketServer";
import cors from "@fastify/cors";

dotenv.config();
const PORT = parseInt(process.env.PORT || "3000");

const fastify: FastifyInstance = Fastify({ logger: false });

const start = async () => {
  try {
    await fastify.register(cookie);
    await fastify.register(jwtPlugin);
    await fastify.register(apiRoutes, { prefix: "/api" });

    setupWebsocketServer(fastify);

    if (process.env.ENABLE_CORS === "true") {
      fastify.register(cors, {
        origin:
          process.env.NODE_ENV === "production" ? process.env.CORS_ORIGIN : "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      });
    }

    await fastify.listen({
      port: PORT,
      host: process.env.NODE_ENV === "production" ? "127.0.0.1" : "0.0.0.0",
    });
    console.log("Fastify listening on port", PORT);

    await connectMongoDB();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

export default fastify;
