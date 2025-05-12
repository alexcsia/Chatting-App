import apiClient from "@/services/apiClient";
import { IMessage } from "@/types/chatInterfaces";

const chatService = {
  async getMessages(chatId: string, before?: number): Promise<IMessage[]> {
    try {
      const url = before
        ? `/api/chats/${chatId}/messages?before=${before}`
        : `/api/chats/${chatId}/messages`;
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },

  async sendMessage(chatId: string, messageText: string) {
    try {
      const response = await apiClient.post(`/api/chats/${chatId}/messages`, {
        content: messageText,
      });
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },

  async getOrCreateChat(username: string) {
    try {
      const response = await apiClient.get(
        `/api/chats/with/${encodeURIComponent(username)}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        const res = await apiClient.post(`/api/chats`, {
          username: username,
        });
        return res.data.chatId;
      } else {
        throw error;
      }
    }
  },
};

export default chatService;
