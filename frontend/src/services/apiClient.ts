import axios from "axios";
import { useUserStore } from "@/stores/user";
import router from "@/router";

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
    const userStore = useUserStore();
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url;
    const isAuthCheckRequest = requestUrl?.endsWith("/user-info");

    if (
      error.response?.status === 401 &&
      !isAuthCheckRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await axios.get(backendURL + "/api/auth/refresh-token", {
          withCredentials: true,
        });

        return apiClient(originalRequest);
      } catch (err) {
        userStore.logout();
        if (!router.currentRoute.value.path.startsWith("/login")) {
          router.push({
            path: "/login",
            query: { redirect: router.currentRoute.value.fullPath },
          });
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
