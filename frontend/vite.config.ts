import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_URL,
        changeOrigin: true,
      },

      "/ws": {
        target: process.env.VITE_BACKEND_URL,
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@services": path.resolve(__dirname, "src/services"),
      "@components": path.resolve(__dirname, "src/components"),
      "@router": path.resolve(__dirname, "src/router"),
      "@views": path.resolve(__dirname, "src/views"),
    },
    extensions: [".ts", ".js", ".tsx", ".jsx", ".vue", ".json"],
  },
});
