import fastify from "../../server";
import { connectMongoDB } from "../../database";
import { User } from "@models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

describe("register endpoint", () => {
  it("should register a new user", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/api/auth/register",
      payload: {
        username: "testsuser",
        password: "ABCabc!@#123",
        email: "abcdx@def.com",
      },
    });

    expect(response.statusCode).toBe(201);
  });

  it("should reject a user with existent credentials", async () => {
    await User.create({
      username: "testuser",
      password: "ABCabc!@#123",
      email: "abcd2@def.com",
    });
    const response = await fastify.inject({
      method: "POST",
      url: "/api/auth/register",
      payload: {
        username: "testuser",
        password: "ABCabc!@#123",
        email: "abcdx@def.com",
      },
    });

    expect(response.statusCode).toBe(400);
  });
});

describe("login endpoint", () => {
  let user: any;
  let password = "ABCabc!@#123";

  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      username: "testuser2",
      password: hashedPassword,
      email: "abcd2@def.com",
    });
  });

  it("should login a user", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        password: password,
        email: user.email,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.cookies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "accessToken" }),
        expect.objectContaining({ name: "refreshToken" }),
      ])
    );
  });
  it("should reject a user with incorrect credentials", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        password: "wrong password",
        email: user.email,
      },
    });

    expect(response.statusCode).toBe(401);
    expect(response.cookies).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "accessToken" }),
        expect.objectContaining({ name: "refreshToken" }),
      ])
    );
  });
});

describe("refresh token endpoint", () => {
  let user: any;
  let token: string;

  beforeAll(async () => {
    user = await User.create({
      username: "testuser",
      password: "ABCabc!@#123",
      email: "abcd2@def.com",
    });

    token = jwt.sign({ userId: user._id }, "refreshsecret", {
      expiresIn: "7d",
      algorithm: "HS384",
    });
  });

  it("should return new accesstoken", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/api/auth/refresh-token",
      cookies: {
        refreshToken: token,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.cookies).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "accessToken" })])
    );
  });

  it("should reject a user with invalid token", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/api/auth/refresh-token",
      cookies: {
        refreshToken: "bad token",
      },
    });

    expect(response.statusCode).toBe(401);
    expect(response.cookies).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "accessToken" }),
        expect.objectContaining({ name: "refreshToken" }),
      ])
    );
  });
});
