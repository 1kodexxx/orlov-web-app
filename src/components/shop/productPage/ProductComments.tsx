// src/components/shop/productPage/ProductComments.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "@/shared/apiClient";
import { useAuth } from "@/features/auth/useAuth";

/* ===== Типы ответа бэка ===== */
type CommentItem = {
  id: number;
  text: string;
  created_at: string; // ISO
  userId: number;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
};

type Paged<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
  pages: number;
};

/* ===== Утилиты отображения ===== */
function fullName(first?: string | null, last?: string | null) {
  const name = `${first ?? ""} ${last ?? ""}`.trim();
  return name || "Пользователь";
}
function initials(name: string, email?: string | null) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = (parts[0]?.[0] ?? "").toUpperCase();
  const b = (parts[1]?.[0] ?? "").toUpperCase();
  const fallback = (email?.[0] ?? "U").toUpperCase();
  return (a + b || fallback).slice(0, 2);
}
function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}
function displayFromUser(u: {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  email: string | null | undefined;
}) {
  const name = `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim();
  if (name) return name;
  return (u.email ?? "").split("@")[0] || "Пользователь";
}

/* ===== Компонент ===== */
export const ProductComments: React.FC<{
  productId: number;
  className?: string;
  pageSize?: number;
}> = ({ productId, className = "", pageSize = 10 }) => {
  const { user } = useAuth(); // ожидаем, что в user есть id, email, firstName, lastName, avatarUrl (или null)
  const isAuthed = !!user;

  const [items, setItems] = useState<CommentItem[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // красивое имя текущего пользователя (для шапки формы и оптимистики)
  const meDisplay = useMemo(
    () =>
      user
        ? displayFromUser({
            firstName: user.firstName ?? null,
            lastName: user.lastName ?? null,
            email: user.email ?? null,
          })
        : "",
    [user]
  );

  async function load(p = 1, append = false) {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch<Paged<CommentItem>>(
        `/catalog/${productId}/comments?page=${p}&limit=${pageSize}`
      );
      setPage(res.page);
      setPages(res.pages);
      setTotal(res.total);
      setItems((prev) => (append ? [...prev, ...res.items] : res.items));
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Не удалось загрузить комментарии"
      );
    } finally {
      setLoading(false);
    }
  }

  // первая загрузка / при смене товара
  useEffect(() => {
    setItems([]);
    setPage(1);
    setPages(1);
    setTotal(0);
    void load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, pageSize]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isAuthed || !text.trim() || posting) return;
    setPosting(true);
    setError(null);
    try {
      const created = await apiFetch<CommentItem>(
        `/catalog/${productId}/comments`,
        {
          method: "POST",
          body: JSON.stringify({ text }),
        }
      );

      // --- Оптимистично подставим имя/фамилию и аватар из текущего профиля, если бэк вернул пусто ---
      let first = created.firstName;
      let last = created.lastName;

      if ((!first || !first.trim() || !last || !last.trim()) && user) {
        const uFirst = user.firstName ?? null;
        const uLast = user.lastName ?? null;
        const uEmail = user.email ?? null;
        const display = displayFromUser({
          firstName: uFirst,
          lastName: uLast,
          email: uEmail,
        });

        if (!uFirst && !uLast) {
          const parts = display.split(/\s+/).filter(Boolean);
          first = parts[0] ?? display;
          last = parts.slice(1).join(" ") || null;
        } else {
          first = uFirst ?? first ?? null;
          last = uLast ?? last ?? null;
        }
      }

      const patched: CommentItem = {
        ...created,
        firstName: first ?? null,
        lastName: last ?? null,
        avatarUrl: created.avatarUrl ?? user?.avatarUrl ?? null,
      };

      setItems((prev) => [patched, ...prev]);
      setText("");
      setTotal((t) => t + 1);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Не удалось отправить комментарий"
      );
    } finally {
      setPosting(false);
    }
  }

  async function remove(id: number) {
    try {
      await apiFetch(`/catalog/comments/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((c) => c.id !== id));
      setTotal((t) => Math.max(0, t - 1));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Не удалось удалить комментарий");
    }
  }

  const canLoadMore = page < pages;
  const headerTitle = useMemo(() => `Комментарии (${total})`, [total]);
  const charCount = text.length;
  const charLimit = 5000;

  return (
    <section className={`py-8 lg:py-12 ${className}`}>
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            {headerTitle}
          </h2>
        </div>

        {/* Форма — только для авторизованных */}
        {isAuthed ? (
          <form
            onSubmit={submit}
            className="mb-8 rounded-xl border border-gray-700 bg-background.paper/70 shadow-[0_12px_32px_rgba(0,0,0,0.35)] p-4 sm:p-5">
            <div className="flex items-start gap-3">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={meDisplay}
                  className="h-11 w-11 rounded-full object-cover border border-gray-700"
                />
              ) : (
                <div className="h-11 w-11 rounded-full grid place-items-center bg-[#2A2A2A] text-sm font-semibold text-gray-200 border border-gray-700">
                  {initials(meDisplay, user?.email ?? null)}
                </div>
              )}

              <div className="flex-1">
                <div className="mb-2 text-sm font-medium text-text.primary">
                  {meDisplay}
                </div>

                <div className="rounded-lg border border-gray-700 bg-[#1b1b1b] focus-within:border-primary">
                  <textarea
                    rows={5}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full resize-y bg-transparent p-3 text-sm text-gray-100 placeholder:text-gray-500 outline-none"
                    placeholder="Напишите комментарий…"
                    maxLength={charLimit}
                    required
                  />
                  <div className="flex items-center justify-end border-t border-gray-700 px-3 py-2">
                    <span className="text-xs text-text.primary">
                      {charCount}/{charLimit}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <button
                    type="submit"
                    disabled={posting || !text.trim()}
                    className="rounded-lg bg-primary text-primary-contrast px-4 py-2.5 text-sm font-semibold hover:bg-[#e6d878] disabled:opacity-60">
                    {posting ? "Отправка…" : "Отправить комментарий"}
                  </button>
                </div>

                {error && (
                  <div className="mt-3 text-sm text-red-400">{error}</div>
                )}
              </div>
            </div>
          </form>
        ) : (
          <div className="mb-8 rounded-lg border border-gray-700 bg-background.paper p-4 text-sm text-text.secondary">
            Чтобы оставить комментарий,&nbsp;
            <Link to="/login" className="text-primary hover:underline">
              войдите в аккаунт
            </Link>
            .
          </div>
        )}

        {/* Список */}
        <div className="space-y-4">
          {items.map((c) => {
            const name = fullName(c.firstName, c.lastName);
            const dateStr = formatDate(c.created_at);
            const own = user?.id === c.userId;
            return (
              <article
                key={c.id}
                className="rounded-xl border border-gray-700 bg-background.paper p-4 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
                <header className="mb-2 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {c.avatarUrl ? (
                      <img
                        src={c.avatarUrl}
                        alt={name}
                        className="h-10 w-10 rounded-full object-cover border border-gray-700"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full grid place-items-center bg-[#2A2A2A] text-xs font-semibold text-gray-200 border border-gray-700">
                        {initials(name)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-white">
                        {name}
                      </div>
                      <div className="text-xs text-text.primary">{dateStr}</div>
                    </div>
                  </div>

                  {own && (
                    <button
                      onClick={() => remove(c.id)}
                      className="rounded p-2 text-text.primary/80 hover:bg-[#2a2a2a] hover:text-text.primary"
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
                  )}
                </header>

                <p className="whitespace-pre-wrap text-text.secondary">
                  {c.text}
                </p>
              </article>
            );
          })}
        </div>

        {/* Пагинация / догрузка */}
        {items.length === 0 && !loading && (
          <div className="mt-6 text-sm text-text.secondary">
            Комментариев пока нет.
          </div>
        )}

        {canLoadMore && (
          <div className="mt-6">
            <button
              disabled={loading}
              onClick={() => load(page + 1, true)}
              className="rounded-lg border border-gray-700 bg-background.paper px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2a2a2a] disabled:opacity-60">
              {loading ? "Загрузка…" : "Показать ещё"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductComments;
