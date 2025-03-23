import apiClient from "@/services/apiClient";
import { IMessage } from "@/types/chatInterfaces";

const getMessages = async (chatId: string): Promise<IMessage[]> => {
  const response = await apiClient.get(`/api/chats/fetch-messages/${chatId}`);
  return response.data;
};
const sendMessage = async (chatId: string, messageText: string) => {
  const response = await apiClient.post(`/api/chats/new-message/${chatId}`, {
    text: messageText,
  });
  return response.data;
};

export default {
  getMessages,
  sendMessage,
};
