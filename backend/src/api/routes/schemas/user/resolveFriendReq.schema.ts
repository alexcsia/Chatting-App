export const resolveFriendReqSchema = {
  headers: {
    type: "object",
    properties: {
      cookie: { type: "string", pattern: "accessToken" },
    },
    required: ["cookie"],
  },
  body: {
    type: "object",
    required: ["accepted"],
    properties: {
      accepted: { type: "boolean" },
    },
  },
  params: {
    type: "object",
    required: ["username"],
    properties: {
      username: { type: "string" },
    },
  },
};

export interface IResolveFriendRequestBody {
  accepted: boolean;
}

export interface IResolveRequestParams {
  username: string;
}
