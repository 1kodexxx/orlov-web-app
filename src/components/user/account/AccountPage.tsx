import React, { useEffect, useState, useCallback } from "react";
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
import { apiFetch, API_BASE } from "@/shared/apiClient";

/** Точное описание ответа /users/me (из бэка) */
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
  birthDate?: string | null;
  pickupPoint?: string | null;
};

const AccountPage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  /** Делает относительный URL с бэка абсолютным */
  const toAbsoluteUrl = useCallback((u?: string | null): string | undefined => {
    if (!u) return undefined;
    if (/^https?:\/\//i.test(u)) return u;

    // базовый origin: берём VITE_API_URL, иначе текущий сайт
    const base = (API_BASE && API_BASE.trim()) || window.location.origin;

    try {
      // ведущий "/" гарантирует путь от корня
      return new URL(u.startsWith("/") ? u : `/${u}`, base).toString();
    } catch {
      const root = base.replace(/\/+$/, "");
      const path = String(u).replace(/^\/+/, "");
      return `${root}/${path}`;
    }
  }, []);

  // локальный алиас поверх apiFetch — для явной типизации
  const api = useCallback(<T,>(path: string, init?: RequestInit) => {
    return apiFetch<T>(path, init);
  }, []);

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
            birthDate: me.birthDate ?? null,
            pickupPoint: me.pickupPoint ?? null,
          });
        }
        setOrders(o ?? []);
        setStats(s ?? null);
        setLiked(l ?? []);
        setComments(c ?? []);
        setCompanyReviews(cr ?? []);
      } catch {
        // Фолбэки, если сеть/сервер недоступны
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

  // сохранение профиля
  async function saveProfile(data: Partial<UserProfile>) {
    const [firstName, ...rest] = (data.name ?? "").trim().split(/\s+/);
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
        // Доп. поля отправляем, если бэк их принимает (сейчас поддерживает)
        birthDate: data.birthDate ?? null,
        pickupPoint: data.pickupPoint ?? null,
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
      birthDate: me.birthDate ?? null,
      pickupPoint: me.pickupPoint ?? null,
    });
  }

  // загрузка аватара
  async function uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append("avatar", file);
    const res = await api<{ avatarUrl: string; user?: MeResponse }>(
      "/users/me/avatar",
      { method: "PATCH", body: fd }
    );
    setProfile((p) =>
      p ? { ...p, avatarUrl: toAbsoluteUrl(res.avatarUrl) } : p
    );
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
    />
  );
};

export default AccountPage;
