export const addFriendSchema = {
  headers: {
    type: "object",
    properties: {
      cookie: { type: "string", pattern: "accessToken" },
    },
    required: ["cookie"],
  },
  body: {
    type: "object",
    required: ["username"],
    properties: {
      username: { type: "string" },
    },
  },
};

export interface IAddFriend {
  username: string;
}
