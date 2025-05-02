import { defineStore } from "pinia";
import { ref } from "vue";
import userService, { UserProfile } from "@/services/user";
import authService from "@/services/auth";

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref<UserProfile | null>(null);
    const isAuthenticated = ref(false);

    async function fetchUser() {
      try {
        const data = await userService.getCurrentUser();
        user.value = data;
        isAuthenticated.value = true;
      } catch (error) {
        logout();
      }
    }

    async function login(credentials: { email: string; password: string }) {
      try {
        await authService.login(credentials);
        await fetchUser();
      } catch (error) {
        console.log("Login failed:", error);
      }
    }

    function logout() {
      user.value = null;
      isAuthenticated.value = false;
    }

    function addToFriend(username: string) {
      try {
        if (
          user.value?.friendList &&
          !user.value.friendList.includes(username)
        ) {
          user.value.friendList = [...user.value.friendList, username];
        }
      } catch (error) {
        console.log("Error adding a friend", error);
      }
    }

    return {
      user,
      isAuthenticated,
      fetchUser,
      login,
      logout,
      addToFriend,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
