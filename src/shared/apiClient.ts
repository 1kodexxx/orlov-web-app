// src/shared/apiClient.ts
let _accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  _accessToken = token;
}
export function getAccessToken() {
  return _accessToken;
}

type ViteEnv = { VITE_API_URL?: string };

export const API_BASE = ((import.meta as unknown as { env: ViteEnv }).env
  .VITE_API_URL ?? "") as string;

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const token = getAccessToken();
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...init,
    headers: {
      "Content-Type":
        init.body instanceof FormData ? undefined! : "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    } as HeadersInit,
  });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const ct = res.headers.get("content-type") ?? "";
      if (ct.includes("application/json")) {
        const j = (await res.json()) as { message?: string | string[] };
        msg = Array.isArray(j.message)
          ? j.message.join(", ")
          : j.message ?? msg;
      } else {
        msg = (await res.text()) || msg;
      }
    } catch {
      // ignore
    }
    throw new Error(msg);
  }
  // 204 / no-content
  if (res.status === 204) return undefined as unknown as T;
  const ct = res.headers.get("content-type") ?? "";
  return (
    ct.includes("application/json") ? res.json() : (res.text() as unknown)
  ) as T;
}
