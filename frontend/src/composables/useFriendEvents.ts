import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { tryRefreshAuth } from "@/services/helpers/refreshToken";

export function useFriendEvents() {
  const userStore = useUserStore();
  const eventSource = ref<EventSource | null>(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const triedReconnect = ref(false);

  const setupSSE = async () => {
    if (eventSource.value) return;
    if (!userStore.user?.username) return;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const source = new EventSource(`${backendURL}/api/sse/connect`, {
      withCredentials: true,
    });

    source.addEventListener("friendRequestAccepted", (e) => {
      const payload = JSON.parse(e.data) as { from: string };
      const newFriend = payload.from;

      if (userStore.user && !userStore.user.friendList.includes(newFriend)) {
        userStore.user.friendList.push(newFriend);
      }
    });

    source.addEventListener("friendRequestReceived", (e) => {
      const payload = JSON.parse(e.data) as { from: string };
      const requester = payload.from;

      if (
        userStore.user &&
        !userStore.user.friendRequests.includes(requester)
      ) {
        userStore.user.friendRequests.push(requester);
      }
    });

    source.onerror = async () => {
      console.warn("sse error, reconnecting");
      if (triedReconnect.value) {
        source.close();
        return;
      }

      triedReconnect.value = true;
      try {
        const ok = await tryRefreshAuth();
        if (ok) {
          eventSource.value = null;
          await setupSSE();
        } else {
          source.close();
        }
      } catch {
        source.close();
        eventSource.value = null;
      }
    };

    eventSource.value = source;
  };

  const closeSSE = () => {
    eventSource.value?.close();
    eventSource.value = null;
    triedReconnect.value = false;
  };

  return {
    setupSSE,
    closeSSE,
  };
}
