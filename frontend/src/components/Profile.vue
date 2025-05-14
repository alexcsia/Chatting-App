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
import { onMounted, onUnmounted } from "vue";
import userService from "@/services/user";
import { useFriendEvents } from "@/composables/useFriendEvents";

const userStore = useUserStore();
const { setupSSE, closeSSE } = useFriendEvents();

async function respondToInvite(inviteUsername: string, accepted: boolean) {
  try {
    await userService.resolveFriendRequest(accepted, inviteUsername);

    if (userStore.user) {
      userStore.user.friendRequests = userStore.user.friendRequests.filter(
        (username) => username != inviteUsername
      );

      if (accepted) {
        userStore.user.friendList.push(inviteUsername);
      }
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

onUnmounted(() => {
  closeSSE();
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
