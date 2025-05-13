import apiClient from "./apiClient";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  email: string;
  username: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await apiClient.post("/api/auth/login", credentials);
    return response.data;
  },

  async signup(credentials: SignupCredentials): Promise<User> {
    const response = await apiClient.post("/api/auth/register", credentials);
    return response.data;
  },

  async logout() {
    const response = await apiClient.post("/api/auth/logout");
  },
};

export default authService;
