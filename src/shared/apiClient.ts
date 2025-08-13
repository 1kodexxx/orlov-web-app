// src/shared/apiClient.ts
import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";

const BASE_URL =
  (import.meta as unknown as { env?: Record<string, string> })?.env
    ?.VITE_API_URL ?? "http://localhost:3000";

const ACCESS_KEY = "access_token";

let accessToken: string =
  (typeof localStorage !== "undefined" && localStorage.getItem(ACCESS_KEY)) ||
  "";

export function setAccessToken(token: string) {
  accessToken = token || "";
  try {
    if (token) {
      localStorage.setItem(ACCESS_KEY, token);
    } else {
      localStorage.removeItem(ACCESS_KEY);
    }
  } catch {
    // ignore
  }
}

export function getAccessToken(): string {
  return accessToken;
}

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // нужны cookie rt
});

// === REQUEST: кладём Bearer ===
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    const headers: AxiosRequestHeaders = (config.headers ??
      {}) as AxiosRequestHeaders;
    headers.Authorization = `Bearer ${accessToken}`;
    config.headers = headers;
  }
  return config;
});

// === RESPONSE: auto refresh on 401 (если не запрещено) ===
let refreshing: Promise<string> | null = null;

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & {
          _retry?: boolean;
        })
      | undefined;

    const status = error.response?.status;

    // Надёжно читаем заголовок запрета refresh
    const headersObj = (original?.headers ?? {}) as Record<string, unknown>;
    const skipRefresh =
      headersObj["x-skip-refresh"] === "1" ||
      headersObj["X-Skip-Refresh"] === "1";

    if (status === 401 && !skipRefresh && original && !original._retry) {
      try {
        original._retry = true;

        if (!refreshing) {
          refreshing = api
            .post<{ accessToken: string }>("/auth/refresh")
            .then((res) => {
              const token = res.data?.accessToken ?? "";
              setAccessToken(token);
              return token;
            })
            .finally(() => {
              refreshing = null;
            });
        }

        const newToken = await refreshing;
        const hdrs: AxiosRequestHeaders = (original.headers ??
          {}) as AxiosRequestHeaders;
        hdrs.Authorization = `Bearer ${newToken}`;
        original.headers = hdrs;

        return api.request(original);
      } catch (e) {
        setAccessToken(""); // refresh не удался — локально деавторизуемся
        throw e;
      }
    }

    throw error;
  }
);
