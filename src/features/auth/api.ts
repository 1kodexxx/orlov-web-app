// API-обёртки для auth, переписаны на apiFetch
import { apiFetch, setAccessToken } from "@/shared/apiClient";

export type Role = "admin" | "manager" | "customer";

export type Me = {
  id: number;
  email: string;
  role: Role;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
};

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

// Профиль
export async function me(): Promise<Me> {
  return apiFetch<Me>("/users/me");
}

export async function logout() {
  await apiFetch("/auth/logout", { method: "POST" });
  setAccessToken(null);
}

/** НОВОЕ: /auth/refresh -> { accessToken, user } (если есть httpOnly rt-кука) */
export async function refresh(): Promise<{
  accessToken: string;
  user: PublicUser;
}> {
  const data = await apiFetch<{ accessToken: string; user: PublicUser }>(
    "/auth/refresh",
    { method: "POST" } // credentials: 'include' уже проставляется в apiFetch
  );
  setAccessToken(data.accessToken);
  return data;
}
