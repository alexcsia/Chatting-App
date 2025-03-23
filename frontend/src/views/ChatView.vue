<template>
  <div>
    <h1>Chat with {{ friendUsername }}</h1>
    <Chat />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Chat from "@/components/Chat.vue";

const route = useRoute();
const friendUsername = ref<string>(route.params.chatid as string);

onMounted(() => {});
</script>
