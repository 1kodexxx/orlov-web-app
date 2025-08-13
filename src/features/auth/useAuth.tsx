// src/features/auth/useAuth.tsx
import React from "react";
import { apiFetch, setAccessToken } from "@/shared/apiClient";

type Role = "admin" | "manager" | "customer";
export type PublicUser = {
  id: number;
  email: string;
  role: Role;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
};

type AuthCtx = {
  user: PublicUser | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  logout: () => Promise<void>;
  setToken: (t: string | null) => void;
};

const Ctx = React.createContext<AuthCtx | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<PublicUser | null>(null);
  const [loading, setLoading] = React.useState(true);

  const refreshProfile = React.useCallback(async () => {
    try {
      const me = await apiFetch<PublicUser>("/users/me");
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = React.useCallback(async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    setAccessToken(null);
    setUser(null);
  }, []);

  const setToken = React.useCallback((t: string | null) => {
    setAccessToken(t);
  }, []);

  React.useEffect(() => {
    // при первом рендере пробуем достать профиль по refresh-cookie
    refreshProfile();
  }, [refreshProfile]);

  const value: AuthCtx = { user, loading, refreshProfile, logout, setToken };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
