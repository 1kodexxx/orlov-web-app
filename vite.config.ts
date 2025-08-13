// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { fileURLToPath } from "node:url";
import svgr from "vite-plugin-svgr";

// ESM-эквиваленты __dirname/__filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Бэкенд для DEV-прокси. Можно переопределить через .env.local:
// BACKEND_ORIGIN=http://127.0.0.1:3000
const BACKEND = process.env.BACKEND_ORIGIN ?? "http://localhost:3000";

/**
 * ВАЖНО:
 * - В DEV используем proxy ниже (API_BASE на фронте можно оставить пустым).
 * - В PREVIEW/PROD proxy НЕ работает → укажи VITE_API_URL в .env.production,
 *   например: VITE_API_URL="http://localhost:3000" или твой домен.
 */
export default defineConfig({
  base: "/",
  plugins: [react(), svgr()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  server: {
    host: true, // можно открывать с другого устройства в локальной сети
    port: 5173,
    strictPort: true,
    proxy: {
      "/auth": { target: BACKEND, changeOrigin: true, secure: false },
      "/users": { target: BACKEND, changeOrigin: true, secure: false },
      "/catalog": { target: BACKEND, changeOrigin: true, secure: false },
      "/favorites": { target: BACKEND, changeOrigin: true, secure: false },
      "/uploads": { target: BACKEND, changeOrigin: true, secure: false }, // статика (аватары/изображения)
    },
  },
  // ВНИМАНИЕ: vite preview не поддерживает proxy.
  // Для preview/prod укажи VITE_API_URL и клиент будет ходить напрямую:
  //   VITE_API_URL="http://localhost:3000"
  // Или настрой nginx/серверный реверс-прокси.
});
