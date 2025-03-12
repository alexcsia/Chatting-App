import mongoose from "mongoose";
import { authenticateUser } from "../authenticateUser";
import { ApiError } from "@api/errors/ApiError";
import { User } from "../../../../models/User";

describe("authenticateUser", () => {
  const testEmail = "testuser@example.com";
  const testPassword = "password123";
  let testUserId: any;
  let user: any;

  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/chatdb",
      {}
    );

    user = new User({
      email: testEmail,
      password: testPassword,
      username: "testuser",
    });
    const savedUser = await user.save();
    testUserId = savedUser._id;
  });

  afterAll(async () => {
    await User.deleteMany({ email: testEmail });
    await mongoose.disconnect();
  });

  it("should return user data for valid email and password", async () => {
    const result = await authenticateUser(testEmail, testPassword);
    console.log(result);

    expect(result).toEqual({
      email: user.email,
      username: user.username,
      userId: user._id.toString(),
    });
  });

  it("should throw an error if the email is incorrect", async () => {
    await expect(
      authenticateUser("wrongemail@example.com", testPassword)
    ).rejects.toThrowError(new ApiError(401, "Email or password is incorrect"));
  });

  it("should throw an error if the password is incorrect", async () => {
    await expect(
      authenticateUser(testEmail, "wrongpassword")
    ).rejects.toThrowError(new ApiError(401, "Email or password is incorrect"));
  });
});
