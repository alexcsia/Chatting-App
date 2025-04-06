import axios from "axios";
import { useUserStore } from "@/stores/user";
import router from "@/router";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const userStore = useUserStore();
    const requestUrl = error.config?.url;

    const isAuthCheckRequest = requestUrl?.endsWith("/user-info");

    router.currentRoute.value.path === "/login";

    if (error.response?.status === 401 && !isAuthCheckRequest) {
      userStore.logout();

      if (!router.currentRoute.value.path.startsWith("/login")) {
        router.push({
          path: "/login",
          query: { redirect: router.currentRoute.value.fullPath },
        });
      }

      return new Promise(() => {});
    }

    return Promise.reject(error);
  }
);

export default apiClient;
