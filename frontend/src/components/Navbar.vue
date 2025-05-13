<template>
  <nav class="navbar">
    <div>
      <router-link to="/profile" class="nav-link">Profile</router-link>
      <router-link to="/dashboard" class="nav-link">Chats</router-link>
    </div>

    <div>
      <SearchBar class="search-container" />
    </div>

    <div>
      <button class="logout-button" @click="logout">Logout</button>
    </div>
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

.search-container {
  width: 100%;
  max-width: 300px;
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
  right: 50px;
}

.logout-button:hover {
  background-color: #e60000;
}
</style>
