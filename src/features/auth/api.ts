// API-обёртки для auth, переписаны на apiFetch
import { apiFetch, setAccessToken } from "@/shared/apiClient";

export type Role = "admin" | "manager" | "customer";

// Полный профиль, который возвращает бэкенд на GET /users/me
export type Me = {
  id: number;
  email: string;
  role: Role;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
};

// Лёгкий пользователь из /auth/login (может и не понадобиться снаружи)
export type PublicUser = {
  id: number;
  email: string;
  role: Role;
  tokenVersion?: number;
};

export type RegisterDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
export type LoginDto = { email: string; password: string };

// /auth/register -> { accessToken, user }
export async function register(dto: RegisterDto) {
  const data = await apiFetch<{ accessToken: string; user: PublicUser }>(
    "/auth/register",
    { method: "POST", body: JSON.stringify(dto) }
  );
  setAccessToken(data.accessToken);
  return data.user;
}

// /auth/login -> { accessToken, user }
export async function login(dto: LoginDto) {
  const data = await apiFetch<{ accessToken: string; user: PublicUser }>(
    "/auth/login",
    { method: "POST", body: JSON.stringify(dto) }
  );
  setAccessToken(data.accessToken);
  return data.user;
}

// Профиль берём из /users/me (возвращает Me напрямую)
export async function me(): Promise<Me> {
  return apiFetch<Me>("/users/me");
}

export async function logout() {
  await apiFetch("/auth/logout", { method: "POST" });
  setAccessToken(null);
}
