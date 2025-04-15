<template>
  <div class="chat-container">
    <div class="messages">
      <div v-for="message in messages" :key="message.id" class="message">
        <p>
          <strong>{{ message.authorUsername }}</strong
          >: {{ message.content }}
        </p>
      </div>
    </div>
    <div class="message-input">
      <input
        v-model="messageText"
        type="text"
        placeholder="Type a message..."
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { io } from "socket.io-client";
import chatService from "@/services/chat";
import { IMessage } from "@/types/chatInterfaces";
import { useUserStore } from "@/stores/user";

const route = useRoute();
const messages = ref<IMessage[]>([]);
const messageText = ref<string>("");
const chatId = ref<string>(route.params.chatId as string);
const userStore = useUserStore();
const authorUsername = userStore.user?.username;

const backendURL = import.meta.env.VITE_BACKEND_URL;

const socket = io(backendURL, {
  path: "/ws",
  transports: ["websocket"],
});

const fetchMessages = async () => {
  try {
    const response = await chatService.getMessages(chatId.value);
    messages.value = response;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
  }
};

onMounted(() => {
  fetchMessages();

  socket.emit("joinChat", chatId.value);

  socket.on("receiveMessage", (message: IMessage) => {
    messages.value.push(message);
  });
});

const sendMessage = async () => {
  if (messageText.value.trim()) {
    const message = {
      chatId: chatId.value,
      content: messageText.value,
      authorUsername: authorUsername,
    };

    try {
      await chatService.sendMessage(chatId.value, messageText.value);
      socket.emit("sendMessage", message);
      messageText.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }
};

onBeforeUnmount(() => {
  socket.disconnect();
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: auto;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 20px;
}

.message {
  margin-bottom: 10px;
}

.message-input {
  display: flex;
  gap: 10px;
}

.message-input input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.message-input button {
  padding: 10px;
  background-color: rgb(71, 71, 160);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.message-input button:hover {
  background-color: rgb(56, 56, 130);
}
</style>
