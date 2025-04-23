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

    if (process.env.ENABLE_CORS === "true") {
      fastify.register(cors, {
        origin:
          process.env.NODE_ENV === "production"
            ? process.env.CORS_ORIGIN
            : "http://localhost:8080",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      });
    }

    await fastify.register(apiRoutes, { prefix: "/api" });

    setupWebsocketServer(fastify);

    console.log(
      "cors origin:",
      process.env.CORS_ORIGIN,
      "node env",
      process.env.NODE_ENV,
      "enable cors",
      process.env.ENABLE_CORS
    );

    await fastify.listen({
      port: PORT,
      host: "0.0.0.0",
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
