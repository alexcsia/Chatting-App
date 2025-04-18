<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div class="app-container">
    <Navbar />
    <div class="content">
      <router-view v-slot="{ Component, route }">
        <component
          :is="Component"
          :key="route.name === 'chat' ? route.fullPath : route.name"
        />
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex: 1;
  padding-top: 60px;
}
</style>
