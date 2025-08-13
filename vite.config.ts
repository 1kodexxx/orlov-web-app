// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { fileURLToPath } from "node:url";
import svgr from "vite-plugin-svgr";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BACKEND = "http://localhost:3000";

export default defineConfig({
  base: "/",
  plugins: [react(), svgr()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/auth": { target: BACKEND, changeOrigin: true, secure: false },
      "/users": { target: BACKEND, changeOrigin: true, secure: false },
      "/catalog": { target: BACKEND, changeOrigin: true, secure: false },
      "/favorites": { target: BACKEND, changeOrigin: true, secure: false },
      "/uploads": { target: BACKEND, changeOrigin: true, secure: false }, // аватары
    },
  },
  preview: {
    proxy: {
      "/auth": { target: BACKEND, changeOrigin: true, secure: false },
      "/users": { target: BACKEND, changeOrigin: true, secure: false },
      "/catalog": { target: BACKEND, changeOrigin: true, secure: false },
      "/favorites": { target: BACKEND, changeOrigin: true, secure: false },
      "/uploads": { target: BACKEND, changeOrigin: true, secure: false },
    },
  },
});
