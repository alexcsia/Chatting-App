import Fastify, { FastifyInstance } from "fastify";
import path from "path";
import staticPlugin from "@fastify/static";
import userRoutes from "./api/routes/register";
import { connectMongoDB } from "./database";

import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const PORT = parseInt(process.env.PORT || "3000");
const fastify: FastifyInstance = Fastify({ logger: false });

fastify.register(staticPlugin, {
  root: path.join(__dirname, "../../frontend/dist"),
});

fastify.register(userRoutes);
const start = async () => {
  try {
    await fastify.listen({ port: PORT });
    console.log("Fastify listening on port 3000");

    await connectMongoDB();
  } catch (err) {
    fastify.log.error(err);
  }
};

start();
