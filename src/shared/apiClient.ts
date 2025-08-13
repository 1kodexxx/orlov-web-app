// src/shared/apiClient.ts
import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

/** Ответ /auth/refresh */
type RefreshResponse = {
  accessToken: string;
  user: {
    sub: number;
    email: string;
    role: "admin" | "manager" | "customer";
  };
};

/** Конфиг запроса с флажком повторной попытки */
type RetryConfig = InternalAxiosRequestConfig & { __retry?: boolean };

/** Базовый axios-клиент */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://localhost:3000
  withCredentials: true, // для httpOnly cookie "rt"
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

// Лёгкое хранилище access-токена (можешь заменить на Redux/Zustand)
let _access = localStorage.getItem("access_token") ?? "";
export const setAccessToken = (t: string) => {
  _access = t;
  if (t) localStorage.setItem("access_token", t);
  else localStorage.removeItem("access_token");
};
export const getAccessToken = () => _access;

// Подмешиваем Authorization
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const t = getAccessToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

// Глобальный авто-рефреш access по 401
let isRefreshing = false;
let waiters: Array<() => void> = [];

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined;
    if (!original) throw error;

    if (error.response?.status === 401 && !original.__retry) {
      original.__retry = true;

      if (isRefreshing) {
        await new Promise<void>((res) => waiters.push(res));
      } else {
        isRefreshing = true;
        try {
          const r = await api.post<RefreshResponse>("/auth/refresh");
          setAccessToken(r.data.accessToken);
        } finally {
          isRefreshing = false;
          waiters.forEach((fn) => fn());
          waiters = [];
        }
      }
      return api(original);
    }

    throw error;
  }
);
