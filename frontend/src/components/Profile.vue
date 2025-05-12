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

    <div v-if="userStore.user?.friendRequests.length" class="friend-invites">
      <h3>Friend Invites</h3>
      <ul>
        <li v-for="invite in userStore.user?.friendRequests" :key="invite">
          {{ invite }}
          <button @click="respondToInvite(invite, true)">Add friend</button>
          <button @click="respondToInvite(invite, false)">Reject</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { tryRefreshAuth } from "@/services/helpers/refreshToken";
import userService from "@/services/user";

const userStore = useUserStore();
const backendURL = import.meta.env.VITE_BACKEND_URL;
const eventSource = ref<EventSource | null>(null);
const friendInvites = ref<string[]>([]);
const triedReconnect = ref(false);

const setupSSE = () => {
  eventSource.value?.close();
  if (!userStore.user?.username) return;

  eventSource.value = new EventSource(`${backendURL}/api/sse/connect`, {
    withCredentials: true,
  });

  eventSource.value.addEventListener("friendRequestAccepted", (e) => {
    const newFriend = JSON.parse(e.data);
    if (userStore.user && !userStore.user.friendList.includes(newFriend)) {
      userStore.user.friendList.push(newFriend);
    }
  });

  eventSource.value.addEventListener("friendRequestReceived", (e) => {
    const payload = JSON.parse(e.data) as { from: string };
    const requester = payload.from;
    if (!friendInvites.value.includes(requester)) {
      userStore.user?.friendRequests.push(requester);
    }
  });

  eventSource.value.onerror = async () => {
    if (triedReconnect.value) {
      eventSource.value?.close();
      return;
    }
    triedReconnect.value = true;
    try {
      const ok = await tryRefreshAuth();
      if (ok) setupSSE();
      else eventSource.value?.close();
    } catch {
      eventSource.value?.close();
    }
  };
};

async function respondToInvite(inviteUsername: string, accepted: boolean) {
  try {
    await userService.resolveFriendRequest(accepted, inviteUsername);
    friendInvites.value = friendInvites.value.filter(
      (username) => username !== inviteUsername
    );
    if (accepted && userStore.user) {
      userStore.user.friendList.push(inviteUsername);
      userStore.user.friendRequests = userStore.user.friendRequests.filter(
        (username) => username !== inviteUsername
      );
    } else if (!accepted && userStore.user) {
      userStore.user.friendRequests = userStore.user.friendRequests.filter(
        (username) => username !== inviteUsername
      );
    }
  } catch (err) {
    console.error("failed to respond to invite:", err);
  }
}

onMounted(async () => {
  if (!userStore.isAuthenticated) {
    await userStore.fetchUser();
  }
  setupSSE();
});

onBeforeUnmount(() => {
  eventSource.value?.close();
  eventSource.value = null;
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
