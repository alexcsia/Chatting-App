import apiClient from "@/services/apiClient";
import { IMessage } from "@/types/chatInterfaces";

const chatService = {
  async getMessages(chatId: string): Promise<IMessage[]> {
    const response = await apiClient.get(`/api/chats/fetch-messages/${chatId}`);
    return response.data;
  },
  async sendMessage(chatId: string, messageText: string) {
    const response = await apiClient.post(`/api/chats/new-message/${chatId}`, {
      text: messageText,
    });
    return response.data;
  },

  async getChatId(username: string) {
    const response = await apiClient.get(
      `/api/chats/fetch-chat?username=${username}`
    );
    return response.data;
  },
};

export default chatService;
