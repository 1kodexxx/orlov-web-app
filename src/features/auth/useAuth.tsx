// src/features/auth/useAuth.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  me as fetchMe,
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
} from "./api";
import { setAccessToken, getAccessToken } from "@/shared/apiClient";

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
};

const Ctx = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<CurrentUser>(null);
  const [loading, setLoading] = useState(true);

  // первый запуск: если есть access — пробуем /auth/me
  useEffect(() => {
    (async () => {
      try {
        if (getAccessToken()) {
          const profile = await fetchMe();
          setUser(profile);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await apiLogin({ email, password }); // setAccessToken выполнится внутри api.ts
    const profile = await fetchMe();
    setUser(profile);
  };

  const register = async (p: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    await apiRegister(p);
    const profile = await fetchMe();
    setUser(profile);
  };

  const logout = async () => {
    // оптимистично чистим локально
    setAccessToken("");
    setUser(null);
    try {
      await apiLogout(); // сервер инвалидирует refresh; в api.ts стоит x-skip-refresh
    } catch {
      // игнорируем сетевые/401, мы уже вышли локально
    }
  };

  const refreshProfile = async () => {
    const profile = await fetchMe();
    setUser(profile);
  };

  return (
    <Ctx.Provider
      value={{ user, loading, login, register, logout, refreshProfile }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = (): AuthCtx => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside <AuthProvider>");
  return v;
};
