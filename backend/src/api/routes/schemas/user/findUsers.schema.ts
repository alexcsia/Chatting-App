export const findUsersSchema = {
  headers: {
    type: "object",
    properties: {
      cookie: { type: "string", pattern: "accessToken" },
    },
    required: ["cookie"],
  },
  params: {
    type: "object",
    required: ["username"],
    properties: {
      username: { type: "string" },
    },
  },
};

export interface findUsersQuery {
  username: string;
}
