import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useAuth } from "@/features/auth/useAuth";
import { useNavigate } from "react-router-dom";
import AccountView from "./AccountView";
import type {
  Order,
  Stats,
  UserProfile,
  ProductSummary,
  MyComment,
  MyCompanyReview,
} from "./types";
import { API_BASE, getAccessToken } from "@/shared/apiClient";

type ViteEnv = { VITE_API_URL?: string };

/** Точное описание ответа /users/me */
type MeResponse = {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  phone: string | null;
  country: string | null;
  city: string | null;
  homeAddress: string | null;
  deliveryAddress: string | null;
};

const AccountPage: React.FC = () => {
  const { user, loading, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const baseUrl = useMemo(
    () =>
      (((import.meta as unknown as { env: ViteEnv }).env.VITE_API_URL ??
        "") as string) || API_BASE,
    []
  );

  /** Делает относительный URL с бэка абсолютным */
  const toAbsoluteUrl = useCallback(
    (u?: string | null): string | undefined => {
      if (!u) return undefined;
      if (/^https?:\/\//i.test(u)) return u;
      try {
        return new URL(u.startsWith("/") ? u : `/${u}`, baseUrl).toString();
      } catch {
        const root = String(baseUrl).replace(/\/+$/, "");
        const path = String(u).replace(/^\/+/, "");
        return `${root}/${path}`;
      }
    },
    [baseUrl]
  );

  /** Хелпер для API с авторизацией и типизацией ответа */
  const api = useCallback(
    <T,>(path: string, init?: RequestInit) => {
      const token = getAccessToken();
      return fetch(`${baseUrl}${path}`, {
        credentials: "include",
        ...init,
        headers: {
          ...(init?.body instanceof FormData
            ? {}
            : { "Content-Type": "application/json" }),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(init?.headers || {}),
        },
      }).then(async (r) => {
        if (!r.ok) {
          const t = await r.text();
          throw new Error(t || `HTTP ${r.status}`);
        }
        if (r.status === 204) return undefined as T;
        const ct = r.headers.get("content-type") ?? "";
        return (
          ct.includes("application/json") ? r.json() : r.text()
        ) as Promise<T>;
      });
    },
    [baseUrl]
  );

  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [liked, setLiked] = useState<ProductSummary[]>([]);
  const [comments, setComments] = useState<MyComment[]>([]);
  const [companyReviews, setCompanyReviews] = useState<MyCompanyReview[]>([]);

  // редирект неавторизованного
  useEffect(() => {
    if (!loading && !user) navigate("/login", { replace: true });
  }, [loading, user, navigate]);

  // первичная загрузка
  useEffect(() => {
    (async () => {
      try {
        const [me, o, s, l, c, cr] = await Promise.all([
          api<MeResponse>("/users/me"),
          api<Order[]>("/users/me/orders"),
          api<Stats>("/users/me/stats"),
          api<ProductSummary[]>("/users/me/likes"),
          api<MyComment[]>("/users/me/comments"),
          api<MyCompanyReview[]>("/users/me/company-reviews"),
        ]);

        if (me) {
          setProfile({
            name:
              `${me.firstName ?? ""} ${me.lastName ?? ""}`.trim() || me.email,
            email: me.email,
            avatarUrl: toAbsoluteUrl(me.avatarUrl),
            phone: me.phone ?? "",
            homeAddress: me.homeAddress ?? "",
            deliveryAddress: me.deliveryAddress ?? "",
            country: me.country ?? null,
            city: me.city ?? null,
          });
        }
        setOrders(o ?? []);
        setStats(s ?? null);
        setLiked(l ?? []);
        setComments(c ?? []);
        setCompanyReviews(cr ?? []);
      } catch {
        // фолбэки (офлайн / ошибки)
        setOrders((prev) =>
          prev.length
            ? prev
            : [
                {
                  id: "FWB12546798",
                  date: "2024-12-11",
                  price: 499,
                  status: "in_transit",
                },
                {
                  id: "FWB12546777",
                  date: "2024-11-10",
                  price: 3287,
                  status: "cancelled",
                },
                {
                  id: "FWB12546846",
                  date: "2024-11-07",
                  price: 111,
                  status: "completed",
                },
                {
                  id: "FWB12546212",
                  date: "2024-10-18",
                  price: 756,
                  status: "completed",
                },
              ]
        );
        setStats(
          (p) =>
            p ?? {
              ordersMade: 0,
              ordersChangePct: 0,
              reviewsAdded: 0,
              reviewsChangePct: 0,
              favoritesAdded: 0,
              favoritesChangePct: 0,
              returns: 0,
              returnsChangePct: 0,
            }
        );
        setProfile(
          (prev) =>
            prev ?? {
              name: user?.email ?? "Пользователь",
              email: user?.email ?? "user@example.com",
            }
        );
      }
    })();
  }, [api, user?.email, toAbsoluteUrl]);

  // --------- сохранение профиля (имя/фамилия, телефоны, адреса и т.п.) ----------
  async function saveProfile(data: Partial<UserProfile>) {
    const name = (data.name ?? "").trim();
    const [firstName, ...rest] = name.split(/\s+/);
    const lastName = rest.join(" ") || undefined;

    const me = await api<MeResponse>("/users/me", {
      method: "PATCH",
      body: JSON.stringify({
        firstName: firstName || undefined,
        lastName,
        phone: data.phone ?? null,
        city: data.city ?? null,
        country: data.country ?? null,
        homeAddress: data.homeAddress ?? null,
        deliveryAddress: data.deliveryAddress ?? null,
      }),
    });

    setProfile({
      name: `${me.firstName ?? ""} ${me.lastName ?? ""}`.trim() || me.email,
      email: me.email,
      avatarUrl: toAbsoluteUrl(me.avatarUrl),
      phone: me.phone ?? "",
      homeAddress: me.homeAddress ?? "",
      deliveryAddress: me.deliveryAddress ?? "",
      country: me.country ?? null,
      city: me.city ?? null,
    });
  }

  // --------- смена email с обязательным logout ----------
  async function changeEmail(newEmail: string) {
    await api<{ email: string }>("/users/me/email", {
      method: "PATCH",
      body: JSON.stringify({ email: newEmail }),
    });
    // logout (инвалидируем access по jti и ++tokenVersion)
    try {
      await api("/auth/logout", {
        method: "POST",
        headers: { "x-skip-refresh": "1" },
      });
    } catch {
      // ignore
    }
    await logout();
    navigate("/login", { replace: true });
  }

  // --------- смена пароля с обязательным logout ----------
  async function changePassword(currentPassword: string, newPassword: string) {
    await api<{ success: true }>("/users/me/password", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    try {
      await api("/auth/logout", {
        method: "POST",
        headers: { "x-skip-refresh": "1" },
      });
    } catch {
      // ignore
    }
    await logout();
    navigate("/login", { replace: true });
  }

  // загрузка аватара
  async function uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append("avatar", file);
    const res = await api<{ avatarUrl: string }>("/users/me/avatar", {
      method: "PATCH",
      body: fd,
    });

    // 1) мгновенно обновим локальный профиль (для текущей страницы)
    setProfile((p) =>
      p ? { ...p, avatarUrl: toAbsoluteUrl(res.avatarUrl) } : p
    );

    // 2) обновим глобальный профиль в AuthContext (для шапки/AccountDropdown)
    try {
      await refreshProfile();
    } catch {
      /* ignore */
    }
  }

  if (loading || !user || !stats || !profile) {
    return (
      <section className="min-h-[60vh] grid place-items-center">
        <div className="text-text.secondary">Загрузка…</div>
      </section>
    );
  }

  return (
    <AccountView
      user={profile}
      stats={stats}
      orders={orders}
      liked={liked}
      comments={comments}
      companyReviews={companyReviews}
      onOrderDetails={(id) => console.log("details", id)}
      onOrderRepeat={(id) => console.log("repeat", id)}
      onOrderCancel={(id) => console.log("cancel", id)}
      onSaveProfile={saveProfile}
      onUploadAvatar={uploadAvatar}
      onChangeEmail={changeEmail}
      onChangePassword={changePassword}
    />
  );
};

export default AccountPage;
