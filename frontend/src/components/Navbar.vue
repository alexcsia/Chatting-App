<template>
  <nav class="navbar">
    <router-link to="/profile" class="nav-link">Profile</router-link>
    <router-link to="/dashboard" class="nav-link">Chats</router-link>

    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for a friend's username"
        class="search-input"
      />
      <button @click="handleSearch" class="search-button">Search</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchQuery = ref("");

const handleSearch = () => {
  console.log("searching for:", searchQuery.value);
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

.search-input {
  padding: 5px 10px;
  border: none;
  border-radius: 20px;
  width: 250px;
  outline: none;
}

.search-button {
  margin-left: 5px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: white;
}
</style>
