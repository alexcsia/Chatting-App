<template>
  <div class="friend-list">
    <h2>Your Friends</h2>
    <ul v-if="friends.length">
      <li v-for="friend in friends" :key="friend" @click="openChat(friend)">
        {{ friend }}
      </li>
    </ul>
    <p v-else>No friends yet.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import profileService from "@/services/profile";

const friends = ref([]);
const router = useRouter();

const fetchFriends = async () => {
  try {
    const user = await profileService.getCurrentUser();
    console.log("User data:", user);

    friends.value = user.friendList;
  } catch (error) {
    console.error("Failed to fetch friends:", error);
  }
};

const openChat = (friendUsername) => {
  router.push(`/chat/${friendUsername}`);
};

onMounted(fetchFriends);
</script>

<style scoped>
.friend-list {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  width: 250px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}
li:hover {
  background-color: #f0f0f0;
}
</style>
