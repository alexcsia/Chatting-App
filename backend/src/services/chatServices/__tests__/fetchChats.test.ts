import { fetchChatIds } from "../utils/fetchChats";
import mongoose from "mongoose";
import { User } from "@models/User";
import { Chat } from "@models/Chat";
import { ApiError } from "@api/errors/ApiError";

describe("fetchChatIds", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/chatdb");

    const user = await User.create({
      username: "testUsername",
      password: "123ABcdef!@#",
      email: "test@test.com",
    });

    await Chat.create({
      userIds: user._id,
    });
  });

  afterAll(async () => {
    await User.deleteMany();
    await Chat.deleteMany();
    await mongoose.disconnect();
  });

  it("should fetch a user's chat IDs from the database", async () => {
    const chatIds = await fetchChatIds("testUsername");

    expect(chatIds).toBeInstanceOf(Array);
    expect(chatIds.length).toBeGreaterThan(0);
    expect(chatIds[0]).toBeDefined();
  });

  it("should throw an error if the user does not exist", async () => {
    await expect(fetchChatIds("nonExistingUser")).rejects.toThrowError(
      ApiError
    );
    await expect(fetchChatIds("nonExistingUser")).rejects.toThrow(
      "User not found"
    );
  });
});
