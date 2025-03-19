import "tsconfig-paths/register";
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

    const io = setupWebsocketServer(fastify);

    if (process.env.ENABLE_CORS === "true") {
      fastify.register(cors, {
        origin: process.env.CORS_ORIGIN || "http://localhost:8080",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      });
    }

    await fastify.listen({ port: PORT });
    console.log("Fastify listening on port", PORT);

    await connectMongoDB();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

export default fastify;
