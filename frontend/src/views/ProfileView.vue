<template>
  <div>
    <h1>Profile</h1>
    <ProfileComponent v-if="userStore.isAuthenticated" />
    <p v-else>Loading profile...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ProfileComponent from "@/components/Profile.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

onMounted(async () => {
  if (!userStore.isAuthenticated) {
    try {
      await userStore.fetchUser();
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  }
});
</script>
