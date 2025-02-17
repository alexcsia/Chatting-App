import Fastify, { FastifyInstance } from "fastify";
import userRoutes from "./api/routes/register";
import { connectMongoDB } from "./database";

import dotenv from "dotenv";
const PORT = parseInt(process.env.PORT || "3000");

const fastify: FastifyInstance = Fastify({ logger: false });

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

fastify.register(require(`@fastify/cors`), {
  origin: `http://localhost:8080`,
  methods: [`GET`, `POST`],
  credentials: true,
});

fastify.get("/api/users", async (request, reply) => {
  return { users: ["Alice", "Bob", "Charlie"] };
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
