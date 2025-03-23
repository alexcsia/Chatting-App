import { defineStore } from "pinia";
import { ref } from "vue";
import profileService, { UserProfile } from "@/services/profile";
import authService from "@/services/auth";

export const useUserStore = defineStore("user", () => {
  const user = ref<UserProfile | null>(null);
  const isAuthenticated = ref(false);

  async function fetchUser() {
    try {
      const data = await profileService.getCurrentUser();
      user.value = data;
      isAuthenticated.value = true;
    } catch (error) {
      user.value = null;
      isAuthenticated.value = false;
    }
  }

  async function login(credentials: { email: string; password: string }) {
    try {
      await authService.login(credentials);
      await fetchUser();
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  function logout() {
    user.value = null;
    isAuthenticated.value = false;
  }

  return {
    user,
    isAuthenticated,
    fetchUser,
    login,
    logout,
  };
});
