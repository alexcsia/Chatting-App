import apiClient from "@/services/apiClient";
import { IMessage } from "@/types/chatInterfaces";

const chatService = {
  async getMessages(chatId: string): Promise<IMessage[]> {
    try {
      const response = await apiClient.get(
        `/api/chats/fetch-messages/${chatId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },

  async sendMessage(chatId: string, messageText: string) {
    try {
      const response = await apiClient.post(
        `/api/chats/new-message/${chatId}`,
        {
          content: messageText,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },

  async getChatId(username: string) {
    try {
      const response = await apiClient.get(
        `/api/chats/fetch-chat?username=${encodeURIComponent(username)}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting chat ID:", error);
      throw error;
    }
  },
};

export default chatService;
