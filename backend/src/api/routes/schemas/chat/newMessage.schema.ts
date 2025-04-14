export const newMessageSchema = {
  headers: {
    type: "object",
    properties: {
      cookie: { type: "string", pattern: "accessToken" },
    },
    required: ["cookie"],
  },
  body: {
    type: "object",
    required: ["content"],
    properties: {
      content: { type: "string" },
    },
  },
  params: {
    type: "object",
    required: ["chatId"],
    properties: {
      chatId: { type: "string" },
    },
  },
};

export interface NewMessageBody {
  content: string;
}

export interface NewMessageParams {
  chatId: string;
}
