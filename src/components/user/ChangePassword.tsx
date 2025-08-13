// src/components/user/ChangePassword.tsx
import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";
import { apiFetch } from "@/shared/apiClient";

function errorText(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "Неизвестная ошибка";
  }
}

const ChangePassword: React.FC = () => {
  // Сначала — все хуки (чтобы не было "hooks called conditionally")
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showCur, setShowCur] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const passwordsMatch = password === confirm;
  const canSubmit =
    !!currentPassword && password.length >= 6 && passwordsMatch && !submitting;

  // Гард: доступ только авторизованным
  if (!loading && !user) {
    return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  }
  if (loading) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await apiFetch<{ success: true }>("/users/me/password", {
        method: "PATCH",
        body: JSON.stringify({
          currentPassword,
          newPassword: password,
        }),
      });

      setSuccess("Пароль успешно изменён. Выполняется выход из аккаунта…");
      await logout(); // инвалидируем сессию
      navigate("/login", { replace: true });
    } catch (err) {
      setError(errorText(err) || "Не удалось изменить пароль");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-background min-h-screen flex items-center justify-center">
      <div className="mx-auto w-full max-w-md px-4">
        <div className="bg-background.paper border border-gray-700 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
          <div className="p-6 sm:p-8">
            <h1 className="mb-1 text-2xl font-semibold leading-tight text-primary">
              Изменить пароль
            </h1>
            <p className="text-sm text-text.secondary">
              Укажите текущий и новый пароль. После смены вы будете выведены из
              аккаунта.
            </p>

            {error && (
              <div className="mt-4 rounded-lg border border-red-800 bg-[#271c1c] px-3 py-2 text-sm text-red-300">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-4 rounded-lg border border-green-900 bg-[#142218] px-3 py-2 text-sm text-green-300">
                {success}
              </div>
            )}

            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              {/* Текущий пароль */}
              <div>
                <label
                  htmlFor="cur-pass"
                  className="mb-2 block text-sm font-medium text-text.primary">
                  Текущий пароль
                </label>
                <div className="relative">
                  <input
                    id="cur-pass"
                    type={showCur ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-gray-700 bg-[#1b1b1b] px-3 py-2.5 pr-16 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCur((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 text-xs text-text.secondary hover:text-primary cursor-pointer">
                    {showCur ? "Скрыть" : "Показать"}
                  </button>
                </div>
              </div>

              {/* Новый пароль */}
              <div>
                <label
                  htmlFor="new-pass"
                  className="mb-2 block text-sm font-medium text-text.primary">
                  Новый пароль
                </label>
                <div className="relative">
                  <input
                    id="new-pass"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-gray-700 bg-[#1b1b1b] px-3 py-2.5 pr-16 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 text-xs text-text.secondary hover:text-primary cursor-pointer">
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
                  htmlFor="confirm-pass"
                  className="mb-2 block text-sm font-medium text-text.primary">
                  Подтверждение пароля
                </label>
                <div className="relative">
                  <input
                    id="confirm-pass"
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full rounded-lg border px-3 py-2.5 pr-16 text-sm outline-none ${
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
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 text-xs text-text.secondary hover:text-primary cursor-pointer">
                    {showConfirm ? "Скрыть" : "Показать"}
                  </button>
                </div>
                {!passwordsMatch && confirm && (
                  <p className="mt-1 text-xs text-red-300">
                    Паролы не совпадают.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-2 w-full rounded-lg bg-primary text-[#1a1a1a] px-5 py-2.5 text-sm font-semibold transition hover:bg-[#e6d878] disabled:cursor-not-allowed disabled:opacity-60">
                {submitting ? "Сохранение…" : "Изменить пароль"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
