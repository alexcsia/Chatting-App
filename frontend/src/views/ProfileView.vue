<template>
  <div>
    <h1>Profile</h1>
    <ProfileComponent v-if="userStore.isAuthenticated" />
    <p v-else>Loading profile...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import ProfileComponent from "@/components/Profile.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const router = useRouter();

onMounted(async () => {
  try {
    if (!userStore.isAuthenticated) {
      await userStore.fetchUser();
    }

    if (!userStore.isAuthenticated) {
      router.replace("/dashboard");
    }
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    router.replace("/dashboard");
  }
});
</script>
