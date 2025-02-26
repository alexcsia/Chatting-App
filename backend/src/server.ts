import Fastify, { FastifyInstance } from "fastify";
import { connectMongoDB } from "./database";
import { authRoutes } from "./api/routes/index";
import cookie from "@fastify/cookie";
import dotenv from "dotenv";
dotenv.config();
const PORT = parseInt(process.env.PORT || "3000");

const fastify: FastifyInstance = Fastify({ logger: false });

fastify.register(require(`@fastify/cors`), {
  origin: `http://localhost:8080`,
  methods: [`GET`, `POST`],
  credentials: true,
});

fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(cookie);

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
