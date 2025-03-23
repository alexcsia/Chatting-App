<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");

const emit = defineEmits<{
  (e: "submit", credentials: { email: string; password: string }): void;
}>();

const handleSubmit = () => {
  emit("submit", { email: email.value, password: password.value });
};
</script>
