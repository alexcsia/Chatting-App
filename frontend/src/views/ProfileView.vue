<template>
  <div>
    <h1>Profile</h1>
    <ProfileComponent v-if="userProfile" :userProfile="userProfile" />
    <p v-else>Loading profile...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import ProfileComponent from "@/components/Profile.vue";
import { useUserStore } from "@/stores/user";

const userProfile = ref<{
  username: string;
  email: string;
  friendList: string[];
} | null>(null);

const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.isAuthenticated);

onMounted(async () => {
  if (!isAuthenticated.value) {
    try {
      await userStore.fetchUser();
      userProfile.value = userStore.user;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  } else {
    userProfile.value = userStore.user;
  }
});
</script>
