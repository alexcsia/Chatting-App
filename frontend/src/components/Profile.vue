<template>
  <div class="profile">
    <h2>{{ userProfile.username }}'s Profile</h2>
    <p>Email: {{ userProfile.email }}</p>

    <div class="friends">
      <h3>Friends</h3>
      <ul>
        <li v-for="friend in userProfile.friendList" :key="friend">
          {{ friend }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps<{
  userProfile: { username: string; email: string; friendList: string[] };
}>();
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
