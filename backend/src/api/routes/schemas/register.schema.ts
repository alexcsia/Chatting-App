export const registerRequestSchema = {
  type: "object",
  required: ["username", "email", "password"],
  properties: {
    username: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
  },
};

export interface registrationRequest {
  username: string;
  email: string;
  password: string;
}
