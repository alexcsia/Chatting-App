<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Login</button>
    <p class="login-link">
      Don't have an account? <router-link to="/login">Login</router-link>
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const userStore = useUserStore();
const router = useRouter();

const handleSubmit = async () => {
  try {
    await userStore.login({ email: email.value, password: password.value });
    router.push("/dashboard");
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>
