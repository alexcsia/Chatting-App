import "tsconfig-paths/register";
import Fastify, { FastifyInstance } from "fastify";
import { connectMongoDB } from "./database";
import { authRoutes } from "./api/routes/index";
import cookie from "@fastify/cookie";
import dotenv from "dotenv";
import { userRoutes } from "./api/routes/user.routes";
import { chatRoutes } from "@api/routes/chat.routes";
import jwtPlugin from "./plugins/jwt";
import { setupWebsocketServer } from "./websockets/websocketServer";

dotenv.config();
const PORT = parseInt(process.env.PORT || "3000");

const fastify: FastifyInstance = Fastify({ logger: false });

const start = async () => {
  try {
    await fastify.register(cookie);
    await fastify.register(jwtPlugin);
    await fastify.register(authRoutes, { prefix: "/auth" });
    await fastify.register(userRoutes);
    await fastify.register(chatRoutes);

    const io = setupWebsocketServer(fastify);

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
