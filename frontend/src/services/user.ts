import apiClient from "./apiClient";

export interface UserProfile {
  username: string;
  email: string;
  friendList: string[];
}

const userService = {
  async getCurrentUser(): Promise<UserProfile | null> {
    const response = await apiClient.get("/api/users/user-info");
    return response.data;
  },

  async findUsers(username: string) {
    const response = await apiClient.get(
      `/api/users/?username=${encodeURIComponent(username)}`
    );
    return response.data.userlist;
  },
};

export default userService;
