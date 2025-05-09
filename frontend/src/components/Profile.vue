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
import { onMounted, onBeforeUnmount, ref } from "vue";
import { tryRefreshAuth } from "@/services/helpers/refreshToken";

const userStore = useUserStore();
const backendURL = import.meta.env.VITE_BACKEND_URL;

const eventSource = ref<EventSource | null>(null);

const setupSSE = () => {
  if (eventSource.value) {
    eventSource.value.close();
  }

  if (userStore.user?.username) {
    eventSource.value = new EventSource(`${backendURL}/api/sse/connect`, {
      withCredentials: true,
    });

    console.log("SSE connection established");

    eventSource.value.addEventListener("friendRequestAccepted", (event) => {
      const data = JSON.parse(event.data);
      console.log("friend request accepted:", data);
      if (userStore.user) {
        if (!userStore.user.friendList.includes(data)) {
          userStore.user.friendList.push(data);
        }
      }
    });

    eventSource.value.addEventListener("friendRequestReceived", (event) => {
      const data = JSON.parse(event.data);
      console.log("friend request received:", data);
      userStore.fetchUser();
    });

    eventSource.value.onerror = async () => {
      try {
        const success = await tryRefreshAuth();

        if (!success) {
          eventSource.value?.close();
        }
      } catch (error) {
        eventSource.value?.close();
      }
    };
  }
};

onMounted(async () => {
  if (!userStore.isAuthenticated) {
    await userStore.fetchUser();
  }

  setupSSE();
});

onBeforeUnmount(() => {
  if (eventSource.value) {
    eventSource.value.close();
    eventSource.value = null;
  }
});
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
