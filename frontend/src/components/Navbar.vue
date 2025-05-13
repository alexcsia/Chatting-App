<template>
  <nav class="navbar">
    <router-link to="/profile" class="nav-link">Profile</router-link>
    <router-link to="/dashboard" class="nav-link">Chats</router-link>

    <div class="search-container"><SearchBar /></div>

    <button @click="logout" class="logout-button">Logout</button>
  </nav>
</template>

<script setup lang="ts">
import SearchBar from "./SearchBar.vue";
import authService from "@/services/auth";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const logout = async () => {
  try {
    await authService.logout();
    userStore.logout();
    sessionStorage.clear();
  } catch (error) {
    console.error("Logout failed", error);
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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

.search-container {
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
}

.logout-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  right: 100px;
}

.logout-button:hover {
  background-color: #e60000;
}
</style>
