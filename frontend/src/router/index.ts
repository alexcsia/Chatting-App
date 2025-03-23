import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import LoginView from "@views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import SignUpView from "@/views/SignUpView.vue";
import ProfileView from "@/views/ProfileView.vue";
import ChatView from "@/views/ChatView.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/login", component: LoginView },
  { path: "/", redirect: "/dashboard" },
  { path: "/dashboard", component: DashboardView },
  { path: "/signup", component: SignUpView },
  { path: "/profile", component: ProfileView },
  { path: "/chat/:chatId", component: ChatView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
