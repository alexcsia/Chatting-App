import { createChat } from "./utils/createChat";
import { createMessage } from "./utils/messages/createMessage";
import { fetchChatMessages } from "./utils/messages/fetchMessages";
import { fetchChatId } from "./utils/fetchChatId";

export default {
  fetchChatMessages,
  createChat,
  createMessage,
  fetchChatId,
};
