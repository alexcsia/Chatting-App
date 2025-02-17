import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Fastify backend
        changeOrigin: true,
      },
      "/ws": {
        target: "http://localhost:3001", // WebSockets
        ws: true,
      },
    },
  },
});
