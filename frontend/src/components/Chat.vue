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
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
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

const loading = ref(false);
const allMessagesLoaded = ref(false);

const backendURL = import.meta.env.VITE_BACKEND_URL;

const socket = io(backendURL, {
  path: "/ws",
  transports: ["websocket"],
  secure: true,
});

const fetchMessages = async (before?: number) => {
  if (loading.value || allMessagesLoaded.value) return;

  const container = document.querySelector(".messages");
  const previousHeight = container?.scrollHeight ?? 0;

  loading.value = true;
  try {
    const newMessages = await chatService.getMessages(chatId.value, before);
    if (newMessages.length === 0) {
      allMessagesLoaded.value = true;
    } else {
      messages.value = [...newMessages, ...messages.value];

      await nextTick();
      if (container) {
        container.scrollTop =
          container.scrollHeight - previousHeight + container.scrollTop;
      }
    }
  } catch (error) {
    console.error("Failed to fetch messages:", error);
  } finally {
    loading.value = false;
  }
};

const handleScroll = (e: Event) => {
  const el = e.target as HTMLElement;
  if (el.scrollTop < 50 && !loading.value && messages.value.length > 0) {
    const oldestTimestamp = new Date(messages.value[0]?.timeStamp).getTime();
    fetchMessages(oldestTimestamp);
  }
};

onMounted(async () => {
  await fetchMessages();

  const container = document.querySelector(".messages");
  await nextTick();
  container?.scrollTo({ top: container.scrollHeight });

  socket.emit("joinChat", chatId.value);

  socket.on("receiveMessage", (message: IMessage) => {
    messages.value.push(message);
  });

  container?.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  socket.disconnect();

  const container = document.querySelector(".messages");
  container?.removeEventListener("scroll", handleScroll);
});

const sendMessage = async () => {
  if (messageText.value.trim()) {
    const message = {
      chatId: chatId.value,
      content: messageText.value,
      authorUsername: authorUsername,
      timeStamp: Date.now(),
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
</script>

<style scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 800px;
  margin: auto;
  box-sizing: border-box;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #f5f5f5;
}

.message {
  margin-bottom: 10px;
}

.message-input {
  display: flex;
  gap: 10px;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: white;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.message-input button {
  padding: 10px 16px;
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
