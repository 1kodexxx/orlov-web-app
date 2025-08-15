import React, { useEffect, useState } from "react";
import {
  me as fetchMe,
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  refresh as apiRefresh, // ⬅️ НОВОЕ
} from "./api";
import { setAccessToken, getAccessToken } from "@/shared/apiClient";
import { Ctx } from "./AuthContextObject";

export type Role = "admin" | "manager" | "customer";
export type CurrentUser = {
  id: number;
  email: string;
  role: Role;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
} | null;

export type AuthCtx = {
  user: CurrentUser;
  loading: boolean;
  login: (p: { email: string; password: string }) => Promise<void>;
  register: (p: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  setToken: (t: string | null) => void;
};

function hasAccessToken(x: unknown): x is { accessToken: string } {
  return (
    typeof x === "object" &&
    x !== null &&
    typeof (x as { accessToken?: unknown }).accessToken === "string"
  );
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<CurrentUser>(null);
  const [loading, setLoading] = useState(true);

  // === НОВОЕ: при старте пробуем:
  // 1) если есть access в памяти — просто /users/me
  // 2) иначе один раз /auth/refresh (по rt-куке), затем /users/me
  useEffect(() => {
    (async () => {
      try {
        if (getAccessToken()) {
          const profile = await fetchMe();
          setUser(profile);
          return;
        }
        // Нет access в памяти — пробуем освежить по httpOnly rt
        try {
          await apiRefresh(); // установит новый access через setAccessToken
          const profile = await fetchMe();
          setUser(profile);
        } catch {
          // refresh недоступен — остаёмся разлогиненными
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  // === конец блока инициализации ===

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await apiLogin({ email, password });
    if (hasAccessToken(res)) setAccessToken(res.accessToken);
    const profile = await fetchMe();
    setUser(profile);
  };

  const register = async (p: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    const res = await apiRegister(p);
    if (hasAccessToken(res)) setAccessToken(res.accessToken);
    const profile = await fetchMe();
    setUser(profile);
  };

  const logout = async () => {
    await apiLogout();
    setAccessToken(null);
    setUser(null);
  };

  const refreshProfile = async () => {
    const profile = await fetchMe();
    setUser(profile);
  };

  const value: AuthCtx = {
    user,
    loading,
    login,
    register,
    logout,
    refreshProfile,
    setToken: setAccessToken,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
