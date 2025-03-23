<template>
  <div>
    <h1>Login</h1>
    <LoginForm @submit="handleLogin" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import LoginForm from "@/components/LoginForm.vue";
import authService from "@/services/auth";

const router = useRouter();

const handleLogin = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const user = await authService.login(credentials);
    console.log("Logged in:", user);
    router.push("/dashboard");
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>
