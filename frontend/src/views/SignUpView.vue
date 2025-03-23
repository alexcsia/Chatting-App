<template>
  <div class="signup-container">
    <h1>Sign Up</h1>
    <SignupForm @submit="handleSignup" />
    <p class="login-link">
      Already have an account? <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import SignupForm from "@/components/SignUpForm.vue";
import authService from "@/services/auth";

const router = useRouter();

const handleSignup = async (credentials: {
  email: string;
  username: string;
  password: string;
}) => {
  try {
    await authService.signup(credentials);
    router.push("/dashboard");
  } catch (error) {
    console.error("Signup failed:", error);
  }
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.login-link {
  margin-top: 10px;
}
</style>
