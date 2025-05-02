<template>
  <div class="search-container" ref="searchContainer">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search for a username"
      class="search-input"
    />
    <button @click="handleSearch" class="search-button">Search</button>

    <ul v-if="searchResults.length" class="search-results">
      <li v-for="user in searchResults" :key="user" class="search-item">
        {{ user }}
        <button @click="addFriend(user)" class="add-button">Add Friend</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import userService from "@/services/user";

const searchQuery = ref("");
const searchResults = ref<string[]>([]);
const searchContainer = ref<HTMLElement | null>(null);

const handleSearch = async () => {
  try {
    const results = await userService.findUsers(searchQuery.value);
    searchResults.value = results.map((user) => user.username);
  } catch (error) {
    console.error("Search failed", error);
  }
};

const addFriend = async (username: string) => {
  try {
    await userService.addFriend(username);
    alert(`Friend request sent to ${username}`);
  } catch (error) {
    console.error("Failed to add friend:", error);
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    searchContainer.value &&
    !searchContainer.value.contains(event.target as Node)
  ) {
    searchResults.value = [];
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.search-container {
  position: relative;
  display: flex;
  align-items: center;
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

.search-results {
  position: absolute;
  top: 40px;
  background-color: white;
  color: black;
  list-style: none;
  padding: 10px;
  border-radius: 5px;
  width: 300px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.search-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
}

.add-button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
</style>
