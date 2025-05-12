import fastify from "../../server";
import { connectMongoDB } from "../../database";
import { User } from "@models/User";
import mongoose from "mongoose";

beforeAll(async () => {
  await connectMongoDB("mongodb://localhost:27017/chatdb");
  await fastify.ready();
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  await fastify.close();
  await mongoose.disconnect();
});

describe("create a new chat", () => {
  let user: any;
  let token: string;

  beforeAll(async () => {
    user = await User.create({
      username: "testuser",
      password: "ABCabc!@#123",
      email: "abcd2@def.com",
    });

    token = await fastify.signJWT(user.username, user.email);
  });

  it("should create a new chat", async () => {
    const userToChat = await User.create({
      username: "testuser2",
      password: "ABCabc!@#123",
      email: "example@def.com",
    });

    const response = await fastify.inject({
      method: "POST",
      url: "/api/chats",
      payload: {
        username: userToChat.username,
      },
      cookies: { accessToken: token },
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toHaveProperty("chatId");
  });

  it("should reject a request with a fake user", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/api/chats",
      payload: {
        username: "inexistentUsername",
      },
      cookies: { accessToken: token },
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).not.toHaveProperty("chatId");
  });
});
