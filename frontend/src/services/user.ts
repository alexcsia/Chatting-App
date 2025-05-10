import apiClient from "./apiClient";

export interface UserProfile {
  username: string;
  email: string;
  friendList: string[];
  friendRequests: string[];
}

export interface ISearchResult {
  username: string;
}

const userService = {
  async getCurrentUser(): Promise<UserProfile | null> {
    const response = await apiClient.get("/api/users/user-info");
    return response.data;
  },

  async findUsers(username: string): Promise<ISearchResult[]> {
    const response = await apiClient.get(
      `/api/users/?username=${encodeURIComponent(username)}`
    );
    return response.data.userList;
  },

  async sendFriendRequest(username: string) {
    try {
      const response = await apiClient.post("/api/users/friend-req", {
        username,
      });
      console.log("sent friend request");
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to send friend request.";
      throw new Error(message);
    }
  },

  async resolveFriendRequest(accepted: boolean, targetUser: string) {
    try {
      const response = await apiClient.post(
        `/api/users/friend-request/${encodeURIComponent(targetUser)}`,
        {
          accepted,
        }
      );
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to send friend request.";
      throw new Error(message);
    }
  },
};

export default userService;
