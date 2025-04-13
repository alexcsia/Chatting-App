import apiClient from "./apiClient";

export interface UserProfile {
  username: string;
  email: string;
  friendList: string[];
}

const profileService = {
  async getCurrentUser(): Promise<UserProfile | null> {
    const response = await apiClient.get("/api/users/user-info");
    return response.data;
  },
};

export default profileService;
