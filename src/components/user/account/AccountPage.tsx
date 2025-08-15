// src/components/user/account/AccountPage.tsx
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
import LeaveCompanyReview from "./LeaveCompanyReview";

type ViteEnv = { VITE_API_URL?: string };

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

  // Делает относительный URL с бэка абсолютным
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

  // Хелпер для API
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
          let msg = `HTTP ${r.status}`;
          try {
            const ct = r.headers.get("content-type") ?? "";
            if (ct.includes("application/json")) {
              const j = (await r.json()) as { message?: string | string[] };
              msg = Array.isArray(j.message)
                ? j.message.join(", ")
                : j.message ?? msg;
            } else {
              msg = (await r.text()) || msg;
            }
          } catch {
            /* ignore */
          }
          throw new Error(msg);
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

  // мои отзывы о компании
  const [companyReviews, setCompanyReviews] = useState<MyCompanyReview[]>([]);
  const [crError, setCrError] = useState<string | null>(null);
  const [crLoading, setCrLoading] = useState(false);

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
        // фолбэки на случай офлайна
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

  // обновить список моих отзывов
  const reloadMyCompanyReviews = useCallback(async () => {
    setCrLoading(true);
    setCrError(null);
    try {
      const cr = await api<MyCompanyReview[]>("/users/me/company-reviews");
      setCompanyReviews(cr ?? []);
    } catch (e) {
      setCrError(e instanceof Error ? e.message : "Не удалось загрузить");
    } finally {
      setCrLoading(false);
    }
  }, [api]);

  // удалить отзыв
  const deleteCompanyReview = useCallback(
    async (id: string | number) => {
      try {
        await api<{ success: true }>(`/company-reviews/${id}`, {
          method: "DELETE",
        });
        setCompanyReviews((prev) =>
          prev.filter((x) => String(x.id) !== String(id))
        );
      } catch (e) {
        alert(
          e instanceof Error
            ? e.message
            : "Не удалось удалить отзыв. Попробуйте позже."
        );
      }
    },
    [api]
  );

  if (loading || !user || !stats || !profile) {
    return (
      <section className="min-h-[60vh] grid place-items-center">
        <div className="text-text.secondary">Загрузка…</div>
      </section>
    );
  }

  return (
    <>
      <AccountView
        user={profile}
        stats={stats}
        orders={orders}
        liked={liked}
        comments={comments}
        companyReviews={companyReviews}
        onOrderDetails={(id: string) => console.log("details", id)}
        onOrderRepeat={(id: string) => console.log("repeat", id)}
        onOrderCancel={(id: string) => console.log("cancel", id)}
        onSaveProfile={async (data: Partial<UserProfile>) => {
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
        }}
        onUploadAvatar={async (file: File) => {
          const fd = new FormData();
          fd.append("avatar", file);
          const res = await api<{ avatarUrl: string }>("/users/me/avatar", {
            method: "PATCH",
            body: fd,
          });
          setProfile((p) =>
            p ? { ...p, avatarUrl: toAbsoluteUrl(res.avatarUrl) } : p
          );
          try {
            await refreshProfile();
          } catch {
            /* ignore */
          }
        }}
        onChangeEmail={async (newEmail: string) => {
          await api<{ email: string }>("/users/me/email", {
            method: "PATCH",
            body: JSON.stringify({ email: newEmail }),
          });
          try {
            await api("/auth/logout", {
              method: "POST",
              headers: { "x-skip-refresh": "1" },
            });
          } catch {
            /* ignore */
          }
          await logout();
          navigate("/login", { replace: true });
        }}
        onChangePassword={async (
          currentPassword: string,
          newPassword: string
        ) => {
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
            /* ignore */
          }
          await logout();
          navigate("/login", { replace: true });
        }}
      />

      {/* ---- Мои отзывы о компании ---- */}
      <section className="max-w-screen-lg mx-auto px-4 mt-12 mb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            Мои отзывы о компании
          </h2>

          <button
            onClick={reloadMyCompanyReviews}
            disabled={crLoading}
            className="rounded-lg border border-gray-700 bg-background-paper px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2a2a2a] disabled:opacity-60">
            {crLoading ? "Обновление…" : "Обновить"}
          </button>
        </div>

        {crError && (
          <div className="mb-6 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-red-200">
            Не удалось загрузить ваши отзывы: {crError}
          </div>
        )}

        <div className="space-y-4 mb-8">
          {companyReviews.length === 0 && !crLoading && (
            <div className="text-sm text-text-secondary">
              Вы ещё не оставляли отзывов.
            </div>
          )}

          {companyReviews.map((r) => (
            <article
              key={r.id}
              className="rounded-xl border border-gray-700 bg-background-paper p-4 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
              <header className="mb-2 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate font-semibold text-white">
                    {new Date(r.createdAt).toLocaleDateString("ru-RU", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </div>
                  {r.isApproved === false && (
                    <div className="text-xs text-yellow-300 mt-1">
                      На модерации
                    </div>
                  )}
                </div>
                <button
                  onClick={() => deleteCompanyReview(r.id)}
                  className="rounded p-2 text-text-primary/80 hover:bg-[#2a2a2a] hover:text-text-primary"
                  title="Удалить">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 7h12m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </header>

              <p className="whitespace-pre-wrap text-text-secondary">
                {r.text}
              </p>
            </article>
          ))}
        </div>

        {/* форма внизу списка */}
        <div className="rounded-xl border border-gray-700 bg-background-paper/70 shadow-[0_12px_32px_rgba(0,0,0,0.35)] p-4 sm:p-5">
          <LeaveCompanyReview
            onCreated={(created: MyCompanyReview) => {
              setCompanyReviews((prev) => [created, ...prev]);
            }}
          />
        </div>
      </section>
    </>
  );
};

export default AccountPage;
