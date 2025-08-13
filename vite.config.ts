// vite.config.ts
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { fileURLToPath } from "node:url";
import svgr from "vite-plugin-svgr";
import fs from "node:fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Можно переопределить через .env.local -> BACKEND_ORIGIN=http://127.0.0.1:3000
const BACKEND = process.env.BACKEND_ORIGIN ?? "http://localhost:3000";

function spaHtmlFallback(routes: RegExp[]): Plugin {
  return {
    name: "dev-spa-html-fallback",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const original = req.url ?? "/";
          const [pathname] = original.split("?"); // без query
          const method = (req.method ?? "GET").toUpperCase();

          // сигналы HTML-навигации
          const accept = String(req.headers["accept"] ?? "");
          const secFetchMode = String(req.headers["sec-fetch-mode"] ?? "");
          const secFetchDest = String(req.headers["sec-fetch-dest"] ?? "");

          const isNavigate =
            secFetchMode === "navigate" ||
            secFetchDest === "document" ||
            accept.includes("text/html");

          // исключаем запросы на файлы (имеют расширение)
          const looksLikeFile = /\.[a-z0-9]+$/i.test(pathname);

          const matchesSpa =
            method === "GET" &&
            !looksLikeFile &&
            routes.some((re) => re.test(pathname));

          if (isNavigate && matchesSpa) {
            const indexPath = path.resolve(server.config.root, "index.html");
            const raw = await fs.readFile(indexPath, "utf-8");
            const html = await server.transformIndexHtml(original, raw);
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.statusCode = 200;
            res.end(html);
            return; // ВАЖНО: не даём запросу уйти в proxy
          }

          next();
        } catch {
          next();
        }
      });
    },
  };
}

// Список SPA-роутов, где F5 должен отдавать index.html
const SPA_ROUTES = [
  /^\/$/, // главная
  /^\/catalog(?:\/.*)?$/, // каталог, карточки
  /^\/cart(?:\/.*)?$/, // корзина
  /^\/account(?:\/.*)?$/, // личный кабинет
  /^\/about-us$/,
  /^\/contacts$/,
  /^\/delivery$/,
  /^\/reviews$/,
];

export default defineConfig({
  base: "/",
  plugins: [react(), svgr(), spaHtmlFallback(SPA_ROUTES)],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // Оставляем прежние пути: логин/регистрация не ломаются
    proxy: {
      "/auth": { target: BACKEND, changeOrigin: true, secure: false },
      "/users": { target: BACKEND, changeOrigin: true, secure: false },
      "/catalog": { target: BACKEND, changeOrigin: true, secure: false },
      "/favorites": { target: BACKEND, changeOrigin: true, secure: false },
      "/uploads": { target: BACKEND, changeOrigin: true, secure: false },
    },
  },
});
