// src/features/auth/api.ts
import { api, setAccessToken } from "@/shared/apiClient";

export type Role = "admin" | "manager" | "customer";

// Профиль, который отдаёт /auth/me
export interface Me {
  id: number;
  email: string;
  role: Role;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface LoginDto {
  email: string;
  password: string;
}

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
  ver: number;
  jti?: string;
}
export interface PublicUser {
  id: number;
  email: string;
  role: Role;
  tokenVersion: number;
}

type RegisterResponse = { accessToken: string; user: JwtPayload };
type LoginResponse = { accessToken: string; user: PublicUser };
type RefreshResponse = { accessToken: string; user: JwtPayload };

export async function register(dto: RegisterDto) {
  const { data } = await api.post<RegisterResponse>("/auth/register", dto);
  setAccessToken(data.accessToken);
  return data.user;
}

export async function login(dto: LoginDto) {
  const { data } = await api.post<LoginResponse>("/auth/login", dto);
  setAccessToken(data.accessToken);
  return data.user;
}

export async function me(): Promise<Me> {
  const { data } = await api.get<{ user: Me }>("/auth/me");
  return data.user;
}

export async function refresh() {
  const { data } = await api.post<RefreshResponse>("/auth/refresh");
  setAccessToken(data.accessToken);
  return data.user;
}

export async function logout() {
  // ⛔️ выключаем авто-refresh для запроса logout
  await api.post("/auth/logout", {}, { headers: { "x-skip-refresh": "1" } });
  setAccessToken("");
}
