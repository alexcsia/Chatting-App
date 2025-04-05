<template>
  <div class="friend-list">
    <h2>Your Friends</h2>
    <ul v-if="friends.length">
      <li
        v-for="friend in friends"
        :key="friend"
        @click="openChat(friend)"
        :class="{ loading: loadingFriend === friend }"
      >
        {{ friend }}
        <span v-if="loadingFriend === friend" class="loading-indicator"
          >...</span
        >
      </li>
    </ul>
    <p v-else>No friends yet.</p>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import chatService from "@/services/chat";

const friends = ref<string[]>([]);
const loadingFriend = ref<string | null>(null);
const error = ref<string | null>(null);
const router = useRouter();
const userStore = useUserStore();

const fetchFriends = async () => {
  try {
    if (!userStore.user?.friendList) {
      throw new Error("Friend list not available");
    }
    friends.value = userStore.user.friendList;
  } catch (err) {
    console.error("Failed to fetch friends:", err);
    error.value = "Failed to load friends list";
  }
};

const openChat = async (friendUsername: string) => {
  if (loadingFriend.value) return;

  loadingFriend.value = friendUsername;
  error.value = null;

  try {
    const chatId = await chatService.getChatId(friendUsername);
    router.push(`/chat/${chatId}`);
  } catch (err) {
    console.error("Failed to open chat:", err);
    error.value = "Could not start chat with " + friendUsername;
  } finally {
    loadingFriend.value = null;
  }
};

onMounted(fetchFriends);
</script>

<style scoped>
.friend-list {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  width: 250px;
  position: relative;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li:hover {
  background-color: #f0f0f0;
}

li.loading {
  background-color: #f5f5f5;
  cursor: wait;
}

.loading-indicator {
  color: #666;
}

.error-message {
  color: #d32f2f;
  margin-top: 10px;
  font-size: 0.9em;
}
</style>
