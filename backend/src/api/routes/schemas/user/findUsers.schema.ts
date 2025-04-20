export const findUsersSchema = {
  headers: {
    type: "object",
    properties: {
      cookie: { type: "string", pattern: "accessToken" },
    },
    required: ["cookie"],
  },
  querystring: {
    type: "object",
    properties: {
      username: { type: "string" },
    },
    required: ["username"],
  },
};

export interface findUsersQuery {
  username: string;
}
