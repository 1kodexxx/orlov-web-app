// src/pages/account/ChangePassword.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type ApiSuccess = { message?: string };

type Props = {
  /** Базовый URL API. По умолчанию берём из VITE_API_URL */
  baseUrl?: string;
  /** Колбэк на успешную операцию */
  onSuccess?: (data: ApiSuccess) => void;
  className?: string;
  /**
   * Если передан токен — режим "сброс по ссылке из письма"
   * (POST /auth/change-password). Если нет — "смена в аккаунте".
   */
  token?: string;

  /** Закрыть модалку/экран (опционально) */
  onClose?: () => void;

  /**
   * Кастомный сабмит для смены внутри аккаунта.
   * Если задан — сетевой запрос не выполняется, а вызывается этот колбэк.
   */
  onSubmit?: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void> | void;
};

/** безопасное извлечение текста ошибки */
function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "Неизвестная ошибка";
  }
}

const ChangePassword: React.FC<Props> = ({
  baseUrl = (import.meta as unknown as { env: { VITE_API_URL?: string } }).env
    .VITE_API_URL ?? "",
  onSuccess,
  className = "",
  token,
  onClose,
  onSubmit,
}) => {
  const navigate = useNavigate();

  /** true => режим "сброс по ссылке" (email + token) */
  const isResetMode = useMemo(() => Boolean(token), [token]);

  // поля для reset-режима
  const [email, setEmail] = useState("");

  // общие поля
  const [currentPassword, setCurrentPassword] = useState(""); // для смены в аккаунте
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const passwordsMatch = confirm === password;

  const canSubmit = isResetMode
    ? email.trim() &&
      password.length >= 6 &&
      passwordsMatch &&
      agree &&
      !loading
    : currentPassword.length >= 1 &&
      password.length >= 6 &&
      passwordsMatch &&
      !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError(null);
    setDone(null);

    try {
      // ========= Режим: Смена в аккаунте =========
      if (!isResetMode) {
        if (onSubmit) {
          // Внешний обработчик: передаём пароли наверх
          await onSubmit(currentPassword, password);
          setDone("Пароль успешно изменён");
          onSuccess?.({ message: "ok" });
          onClose?.();
          setTimeout(() => navigate("/login", { replace: true }), 150);
          return;
        }

        // Внутренний сетевой запрос
        const res = await fetch(`${baseUrl}/users/me/password`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentPassword,
            newPassword: password,
          }),
        });

        if (!res.ok) {
          const ct = res.headers.get("content-type") ?? "";
          let msg = `HTTP ${res.status}`;
          if (ct.includes("application/json")) {
            const j = (await res.json()) as { message?: string | string[] };
            msg = Array.isArray(j.message)
              ? j.message.join(", ")
              : j.message ?? msg;
          } else {
            msg = (await res.text()) || msg;
          }
          throw new Error(msg);
        }

        const data = (await res.json().catch(() => ({}))) as ApiSuccess;
        setDone(data.message || "Пароль успешно изменён");
        onSuccess?.(data);
        onClose?.();
        setTimeout(() => navigate("/login", { replace: true }), 150);
        return;
      }

      // ========= Режим: Сброс по ссылке (email + token) =========
      const res = await fetch(`${baseUrl}/auth/change-password`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, token }),
      });

      if (!res.ok) {
        const ct = res.headers.get("content-type") ?? "";
        let msg = `HTTP ${res.status}`;
        if (ct.includes("application/json")) {
          const j = (await res.json()) as { message?: string | string[] };
          msg = Array.isArray(j.message)
            ? j.message.join(", ")
            : j.message ?? msg;
        } else {
          msg = (await res.text()) || msg;
        }
        throw new Error(msg);
      }

      const data = (await res.json().catch(() => ({}))) as ApiSuccess;
      setDone(data.message || "Пароль успешно изменён");
      onSuccess?.(data);
      onClose?.();
      setTimeout(() => navigate("/login", { replace: true }), 150);
    } catch (err: unknown) {
      setError(getErrorMessage(err) || "Не удалось изменить пароль");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className={`bg-background min-h-screen flex items-center justify-center ${className}`}>
      <div className="mx-auto w-full max-w-md px-4">
        <div className="bg-background.paper border border-gray-700 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="mb-1 text-2xl font-semibold leading-tight text-primary">
                  {isResetMode ? "Смена пароля" : "Изменить пароль"}
                </h2>
                <p className="text-sm text-text.secondary">
                  {isResetMode
                    ? "Введите e-mail и новый пароль. После успешной смены вы будете перенаправлены на страницу входа."
                    : "Укажите текущий и новый пароль. После смены вы будете выведены из аккаунта."}
                </p>
              </div>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer rounded p-1 text-text.secondary hover:text-white"
                  aria-label="Закрыть">
                  ✕
                </button>
              )}
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-800 bg-[#271c1c] px-3 py-2 text-sm text-red-300">
                {error}
              </div>
            )}
            {done && (
              <div className="mt-4 rounded-lg border border-green-900 bg-[#142218] px-3 py-2 text-sm text-green-300">
                {done}
              </div>
            )}

            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              {/* Email — только для reset-режима */}
              {isResetMode && (
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-text.primary">
                    Ваш e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                    className="w-full rounded-lg border border-gray-700 bg-[#1b1b1b] px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={isResetMode}
                    autoComplete="email"
                  />
                </div>
              )}

              {/* Текущий пароль — только при смене из аккаунта */}
              {!isResetMode && (
                <div>
                  <label
                    htmlFor="current"
                    className="mb-2 block text-sm font-medium text-text.primary">
                    Текущий пароль
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrent ? "text" : "password"}
                      id="current"
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-gray-700 bg-[#1b1b1b] px-3 py-2.5 pr-14 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent((s) => !s)}
                      className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 text-xs text-text.secondary hover:text-primary">
                      {showCurrent ? "Скрыть" : "Показать"}
                    </button>
                  </div>
                </div>
              )}

              {/* Новый пароль */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-text.primary">
                  Новый пароль
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-gray-700 bg-[#1b1b1b] px-3 py-2.5 pr-14 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 text-xs text-text.secondary hover:text-primary">
                    {showPass ? "Скрыть" : "Показать"}
                  </button>
                </div>
                <p className="mt-1 text-xs text-text.secondary">
                  Минимум 6 символов.
                </p>
              </div>

              {/* Подтверждение пароля */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-medium text-text.primary">
                  Подтверждение пароля
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    id="confirm-password"
                    placeholder="••••••••"
                    className={`w-full rounded-lg border px-3 py-2.5 pr-14 text-sm outline-none ${
                      passwordsMatch || !confirm
                        ? "border-gray-700 bg-[#1b1b1b] text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary"
                        : "border-red-800 bg-[#2a1515] text-gray-100 placeholder:text-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    }`}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 text-xs text-text.secondary hover:text-primary">
                    {showConfirm ? "Скрыть" : "Показать"}
                  </button>
                </div>
                {!passwordsMatch && confirm && (
                  <p className="mt-1 text-xs text-red-300">
                    Пароли не совпадают.
                  </p>
                )}
              </div>

              {/* Согласие — только для reset-режима */}
              {isResetMode && (
                <label className="mt-2 flex items-center gap-3 text-sm">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-700 bg-[#1b1b1b] text-primary focus:ring-primary"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    required
                  />
                  <span className="text-text.secondary">
                    Я принимаю{" "}
                    <a href="/terms" className="text-primary hover:underline">
                      Условия использования
                    </a>{" "}
                    и{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                      Политику конфиденциальности
                    </a>
                    .
                  </span>
                </label>
              )}

              {/* Кнопка */}
              <button
                type="submit"
                disabled={!canSubmit}
                className="cursor-pointer mt-2 w-full rounded-lg bg-primary text-[#1a1a1a] px-5 py-2.5 text-sm font-semibold transition hover:bg-[#e6d878] disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Сохранение…" : "Изменить пароль"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
