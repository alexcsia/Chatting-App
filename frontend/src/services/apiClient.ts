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

    if (error.response?.status === 401) {
      userStore.logout();

      router.push({
        path: "/login",
        query: { redirect: router.currentRoute.value.fullPath },
      });

      return new Promise(() => {});
    }

    return Promise.reject(error);
  }
);

export default apiClient;
