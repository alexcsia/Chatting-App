import mongoose from "mongoose";
import { addUserToFriendList } from "../utils/addToFriendList";
import { ApiError } from "@api/errors/ApiError";
import { User } from "@models/User";

describe("addUserToFriendList", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/chatdb");
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("throws an error if requesting user is not found", async () => {
    await expect(
      addUserToFriendList("nonexistentUser", "friend")
    ).rejects.toThrowError(new ApiError(404, "User not found"));
  });

  it("throws an error if the user tries to add themselves as a friend", async () => {
    const user = new User({
      username: "user1",
      email: "user1@example.com",
      password: "ABCabc123!@#",
    });
    await user.save();

    await expect(addUserToFriendList("user1", "user1")).rejects.toThrowError(
      new ApiError(400, "Cannot add yourself to friendlist")
    );
  });

  it("adds a user to the friend list", async () => {
    const user = new User({
      username: "user1",
      email: "user1@example.com",
      password: "ABCabc123!@#",
    });
    const friend = new User({
      username: "friend1",
      email: "friend1@example.com",
      password: "ABCabc123!@#",
    });

    await user.save();
    await friend.save();

    await addUserToFriendList("user1", "friend1");

    const updatedUser = await User.findOne({ username: "user1" });

    expect(updatedUser?.friendList).toContain("friend1");
  });
});
