<template>
  <nav class="navbar">
    <router-link to="/profile" class="nav-link">Profile</router-link>
    <router-link to="/dashboard" class="nav-link">Chats</router-link>

    <div class="search-container"><SearchBar /></div>
  </nav>
</template>

<script setup lang="ts">
import SearchBar from "./SearchBar.vue";
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
</style>
