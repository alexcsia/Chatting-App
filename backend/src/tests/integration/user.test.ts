jest.mock("redis", () => ({
  createClient: jest.fn(() => ({
    connect: jest.fn(),
    on: jest.fn(),
    subscribe: jest.fn(),
    publish: jest.fn(),
    set: jest.fn(),
    get: jest.fn(),
    quit: jest.fn(),
    sIsMember: jest.fn(),
    sAdd: jest.fn(),
    sRem: jest.fn(),
    lRange: jest.fn(),
    unsubscribe: jest.fn(),
    rPush: jest.fn(),
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

describe("resolve friend request endpoint", () => {
  let token: string;
  let user: any;
  let newFriend: any;

  beforeEach(async () => {
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
      method: "PATCH",
      url: `/api/users/${newFriend.username}/friend-requests`,
      cookies: {
        accessToken: token,
      },
      payload: {
        accepted: true,
      },
    });

    const updatedFriend = await User.findOne({ username: newFriend.username });
    expect(response.statusCode).toBe(200);
    expect(updatedFriend?.friendList).toContain(user.username);
  });

  it("should reject adding a user", async () => {
    const response = await fastify.inject({
      method: "PATCH",
      url: `/api/users/${newFriend.username}/friend-requests`,
      cookies: {
        accessToken: token,
      },
      payload: {
        accepted: false,
      },
    });

    const updatedFriend = await User.findOne({ username: user.username });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveProperty("message");
    expect(updatedFriend?.friendList).not.toContain(newFriend.username);
  });
});

describe("user info endpoint", () => {
  let token: string;
  let user: any;

  beforeEach(async () => {
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
      url: "/api/users/me",
      cookies: {
        accessToken: token,
      },
    });

    const data = JSON.parse(response.body);

    expect(data).toMatchObject({
      username: user.username,
      email: user.email,
      userId: user._id.toString(),
      friendList: [],
    });
    expect(response.statusCode).toBe(200);
  });

  it("rejects if token is invalid ", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/api/users/me",
      cookies: {
        accessToken: "token",
      },
    });

    expect(response.statusCode).toBe(401);
  });
});

describe("friend requests", () => {
  let token: string;
  let user: any;
  let newFriend: any;

  beforeEach(async () => {
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

  it("sends a friend request to another user", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/api/users/friend-requests",
      cookies: {
        accessToken: token,
      },
      payload: {
        username: newFriend.username,
      },
    });
    const updatedFriend = await User.findOne({ username: newFriend.username });
    expect(response.statusCode).toBe(200);
    expect(updatedFriend?.pendingFriendRequests).toContain(user.username);
  });
  it("throws an error if friend request was already sent", async () => {
    await User.updateOne(
      { _id: newFriend._id },
      { $addToSet: { pendingFriendRequests: user.username } }
    );
    const response = await fastify.inject({
      method: "POST",
      url: "/api/users/friend-requests",
      cookies: {
        accessToken: token,
      },
      payload: {
        username: newFriend.username,
      },
    });

    expect(response.statusCode).toBe(400);
  });
});
