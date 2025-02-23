export const registerUserSchema = {
  type: "object",
  required: ["username", "email"],
  properties: {
    username: { type: "string" },
    email: { type: "string" },
  },
};
