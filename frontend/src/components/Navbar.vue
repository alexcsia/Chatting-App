<template>
  <nav class="navbar">
    <div class="left-section">
      <router-link to="/profile" class="nav-link">Profile</router-link>
      <router-link to="/dashboard" class="nav-link">Chats</router-link>
    </div>

    <div class="center-section">
      <SearchBar class="search-container" />
    </div>

    <div class="right-section" v-show="userStore.user">
      <button class="logout-button" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import SearchBar from "./SearchBar.vue";
import authService from "@/services/auth";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const logout = async () => {
  try {
    await authService.logout();
    userStore.logout();
    sessionStorage.clear();
    router.push("/login");
  } catch (error) {
    console.error("Logout failed", error);
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  background-color: #333;
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

.left-section {
  display: flex;
  gap: 12px;
}

.center-section {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.search-container {
  width: 300px;
}

.right-section {
  margin-left: auto;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 5px;
}

.nav-link:hover {
  text-decoration: underline;
}

.logout-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  right: 50%;
}

.logout-button:hover {
  background-color: #e60000;
}
</style>
