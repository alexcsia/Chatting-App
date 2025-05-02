<template>
  <div class="profile">
    <h2>{{ userStore.user?.username }}'s Profile</h2>
    <p>Email: {{ userStore.user?.email }}</p>

    <div class="friends">
      <h3>Friends</h3>
      <ul>
        <li v-for="friend in userStore.user?.friendList" :key="friend">
          {{ friend }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<style scoped>
.profile {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}

.friends ul {
  list-style: none;
  padding: 0;
}

.friends li {
  background: #f3f3f3;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
}
</style>
