<template>
  <div>
    <h1>Profile</h1>
    <ProfileComponent v-if="userProfile" :userProfile="userProfile" />
    <p v-else>Loading profile...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ProfileComponent from "@/components/Profile.vue";
import profileService from "@/services/profile";

const userProfile = ref<{
  username: string;
  email: string;
  friendList: string[];
} | null>(null);

onMounted(async () => {
  try {
    userProfile.value = await profileService.getCurrentUser();
  } catch (error) {
    console.error("Failed to fetch profile:", error);
  }
});
</script>
