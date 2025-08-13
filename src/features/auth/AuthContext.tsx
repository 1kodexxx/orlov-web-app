import React, { useEffect, useState } from "react";
import {
  me as fetchMe,
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
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
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<CurrentUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (getAccessToken()) {
          const u = await fetchMe();
          setUser(u);
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
    await apiLogin({ email, password });
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
    await apiLogout();
    setAccessToken("");
    setUser(null);
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
