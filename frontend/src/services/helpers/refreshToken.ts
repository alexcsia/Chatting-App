import axios from "axios";
import { useUserStore } from "@/stores/user";
import router from "@/router";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export async function tryRefreshAuth() {
  const userStore = useUserStore();

  try {
    await axios.get(backendURL + "/api/auth/refresh-token", {
      withCredentials: true,
    });
    return true;
  } catch (err) {
    userStore.logout();
    if (!router.currentRoute.value.path.startsWith("/login")) {
      router.push({
        path: "/login",
        query: { redirect: router.currentRoute.value.fullPath },
      });
    }
    return false;
  }
}
