export const loginRequestSchema = {
  type: "object",
  required: ["email", "password"],
  properties: { email: { type: "string" }, password: { type: "string" } },
};

export interface loginRequest {
  email: string;
  password: string;
}
