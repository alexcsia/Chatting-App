<template>
  <form @submit.prevent="handleSubmit" class="signup-form">
    <div class="input-group">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="form.email" required />
    </div>

    <div class="input-group">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="form.username" required />
    </div>

    <div class="input-group">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="form.password" required />
    </div>

    <button type="submit">Sign Up</button>
  </form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emits = defineEmits<{
  (
    e: "submit",
    form: { email: string; username: string; password: string }
  ): void;
}>();
const form = ref({ email: "", username: "", password: "" });

const handleSubmit = () => {
  emits("submit", form.value);
};
</script>

<style scoped>
.signup-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.input-group {
  margin-bottom: 10px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
