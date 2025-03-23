<template>
  <div class="dashboard">
    <div v-if="!isAuthenticated" class="auth-container">
      <h2>Welcome!</h2>
      <p>Please log in or sign up to start chatting.</p>
      <div class="button-group">
        <button @click="goToLogin" class="login-button">Login</button>
        <button @click="goToSignup" class="signup-button">Sign Up</button>
      </div>
    </div>

    <div v-else class="chat-container">
      <h2>Chat Dashboard</h2>
      <p>Welcome, {{ user?.username }}! Start chatting with others.</p>
      <FriendList />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import profileService from "@/services/profile";
import FriendList from "@/components/FriendList.vue";

const router = useRouter();
const isAuthenticated = ref(false);
const user = ref(null);

const checkAuth = async () => {
  try {
    const currentUser = await profileService.getCurrentUser();
    user.value = currentUser;
    isAuthenticated.value = true;
  } catch (error) {
    isAuthenticated.value = false;
  }
};

const goToLogin = () => {
  router.push("/login");
};

const goToSignup = () => {
  router.push("/signup");
};

onMounted(checkAuth);
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.auth-container {
  text-align: center;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}
.login-button,
.signup-button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.login-button {
  background-color: rgb(71, 71, 160);
  color: white;
}
.signup-button {
  background-color: rgb(83, 168, 83);
  color: white;
}
.chat-container {
  width: 100%;
  max-width: 600px;
}
.logout-button {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: rgb(185, 64, 64);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
