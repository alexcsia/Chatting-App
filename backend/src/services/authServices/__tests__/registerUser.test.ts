import mongoose, { mongo } from "mongoose";
import { registerUser } from "../utils/registerUser";
import { User } from "@models/User";

describe("register user", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/chatdb");
  });

  afterAll(async () => {
    await User.deleteMany();

    await mongoose.disconnect();
  });
  afterEach(async () => {
    await User.deleteMany();
  });

  it("should add a validated user to db", async () => {
    const user = {
      username: "testUsername",
      email: "testEmail@gmail.com",
      password: "TestPassWord123@!",
    };

    const result = await registerUser(user.username, user.email, user.password);

    expect(result).resolves;
    const createdUser = await User.findOne({ username: user.username });
    expect(createdUser).toBeDefined;
  });

  it("should reject a user with a bad username", async () => {
    const user = {
      username: "testUsername!!<>${}",
      email: "testEmail@gmail.com",
      password: "TestPassWord123@!",
    };
    await expect(
      registerUser(user.username, user.email, user.password)
    ).rejects.toThrow("Username must be alphanumeric.");
    const createdUser = await User.findOne({ username: user.username });
    expect(createdUser).toBeNull;
  });

  it("should reject a user with a bad email", async () => {
    const user = {
      username: "testUsername1",
      email: "testEmail",
      password: "TestPassWord123!",
    };
    await expect(
      registerUser(user.username, user.email, user.password)
    ).rejects.toThrow("Invalid email format");
    const createdUser = await User.findOne({ username: user.username });
    expect(createdUser).toBeNull;
  });

  it("should reject a user with a bad password", async () => {
    const user = {
      username: "testUsername2",
      email: "testEmail@gmail.com",
      password: "1234",
    };
    await expect(
      registerUser(user.username, user.email, user.password)
    ).rejects.toThrow(
      "Password must contain at least 10 characters, 2 lowercase, 2 uppercase, 2 numbers, 2 symbols"
    );
    const createdUser = await User.findOne({ username: user.username });
    expect(createdUser).toBeNull;
  });
});
