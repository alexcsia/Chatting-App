import axios from "axios";
import { tryRefreshAuth } from "./helpers/refreshToken";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: backendURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url;
    const isAuthCheckRequest = requestUrl?.endsWith("/user-info");

    if (
      error.response?.status === 401 &&
      !isAuthCheckRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const success = await tryRefreshAuth();

      if (success) {
        return apiClient(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
