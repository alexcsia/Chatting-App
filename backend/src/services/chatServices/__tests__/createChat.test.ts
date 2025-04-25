import { createChat } from "../utils/createChat";
import { User } from "@models/User";
import { Chat } from "@models/Chat";
import mongoose from "mongoose";

describe("createChat", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/chatdb");
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Chat.deleteMany({});
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should create a chat between two existing users", async () => {
    const user1 = await User.create({
      username: "user1",
      email: "user1@example.com",
      password: "TestPassword!234",
    });
    const user2 = await User.create({
      username: "user2",
      email: "user2@example.com",
      password: "TestPassword!234",
    });

    const chat = await createChat(user1.username, user2.username);

    expect(chat).toBeDefined();

    expect(chat.userIds.map((id) => id.toString())).toEqual(
      expect.arrayContaining([user1._id.toString(), user2._id.toString()])
    );
  });

  it("should throw an error if one of the users does not exist", async () => {
    await expect(createChat("user1", "nonexistentUser")).rejects.toThrow(
      "User(s) not found"
    );
  });
});
