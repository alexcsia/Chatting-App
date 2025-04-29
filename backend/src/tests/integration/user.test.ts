jest.mock("redis", () => ({
  createClient: jest.fn(() => ({
    connect: jest.fn(),
    on: jest.fn(),
    subscribe: jest.fn(),
    publish: jest.fn(),
    set: jest.fn(),
    get: jest.fn(),
    quit: jest.fn(),
  })),
}));

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

describe("add friend endpoint", () => {
  let token: string;
  let user: any;
  let newFriend: any;

  beforeAll(async () => {
    user = await User.create({
      username: "testuser2",
      password: "ABCabc!@#123",
      email: "abcd2@def.com",
    });

    newFriend = await User.create({
      username: "newFriend",
      password: "ABCabc!@#123",
      email: "example@def.com",
    });

    token = await fastify.signJWT(user.username, user.email);
  });

  it("should add a user to another user's friendlist", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/api/users/add-friend",
      cookies: {
        accessToken: token,
      },
      payload: {
        username: "newFriend",
      },
    });

    expect(response.statusCode).toBe(200);
  });

  it("should reject adding a user that does not exist", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/api/users/add-friend",
      cookies: {
        accessToken: token,
      },
      payload: {
        username: "nonExistingUser",
      },
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toHaveProperty("message");
  });
});

describe("user info endpoint", () => {
  let token: string;
  let user: any;

  beforeAll(async () => {
    user = await User.create({
      username: "testuser2",
      password: "ABCabc!@#123",
      email: "abcd2@def.com",
    });

    token = await fastify.signJWT(user.username, user.email);
  });

  it("returns a user's info ", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/api/users/user-info",
      cookies: {
        accessToken: token,
      },
    });

    expect(response.statusCode).toBe(200);
  });

  it("rejects if token is invalid ", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/api/users/user-info",
      cookies: {
        accessToken: "token",
      },
    });

    expect(response.statusCode).toBe(401);
  });
});
