import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "@/shared/apiClient";

type PublicUser = {
  sub?: number;
  id?: number;
  email: string;
  role: "admin" | "manager" | "customer";
};

type LoginResponse = {
  accessToken: string;
  user: PublicUser;
};

type Props = {
  /** Можно переопределить URL бэкенда; по умолчанию берём из .env (VITE_API_URL) */
  baseUrl?: string;
  onSuccess?: (data: LoginResponse) => void;
  className?: string;
};

// безопасное извлечение текста ошибки
function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "Неизвестная ошибка";
  }
}

export const LoginForm: React.FC<Props> = ({
  baseUrl = import.meta.env.VITE_API_URL ?? "",
  onSuccess,
  className = "",
}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email.trim() && password.length >= 1 && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        credentials: "include", // httpOnly refresh cookie
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
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

      const data = (await res.json()) as LoginResponse;

      // Сохраняем access-токен для axios-интерцептора
      setAccessToken(data.accessToken);

      onSuccess?.(data);
      navigate("/account", { replace: true });
    } catch (err: unknown) {
      setError(getErrorMessage(err) || "Не удалось войти");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className={`bg-background min-h-screen flex items-center justify-center ${className}`}>
      <div className="w-full max-w-md px-4">
        {/* Карточка: стиль как у виджетов */}
        <div className="bg-background.paper border border-gray-700 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-semibold text-primary">
              Войти в аккаунт
            </h1>

            {error && (
              <div className="mt-4 rounded-lg border border-red-800 bg-[#271c1c] px-3 py-2 text-sm text-red-300">
                {error}
              </div>
            )}

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {/* E-mail */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-text.primary">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  className="w-full rounded-lg border border-gray-700 bg-[#1b1b1b] px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              {/* Пароль */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-text.primary">
                  Пароль
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-gray-700 bg-[#1b1b1b] px-3 py-2.5 pr-10 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 text-xs text-text.secondary hover:text-primary"
                    aria-label={
                      showPassword ? "Скрыть пароль" : "Показать пароль"
                    }>
                    {showPassword ? "Скрыть" : "Показать"}
                  </button>
                </div>
              </div>

              {/* Запомнить меня + Забыл пароль */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 text-sm text-text.secondary">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-700 bg-[#1b1b1b] text-primary focus:ring-primary"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Запомнить меня
                </label>

                <a
                  href="/account/change-password"
                  className="text-sm text-primary hover:underline">
                  Забыли пароль?
                </a>
              </div>

              {/* Кнопка входа */}
              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-2 w-full rounded-lg bg-primary text-[#1a1a1a] px-5 py-2.5 text-sm font-semibold transition hover:bg-[#e6д878] disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Вход…" : "Войти"}
              </button>

              {/* Ссылки */}
              <p className="text-center text-sm text-text.secondary">
                Нет аккаунта?{" "}
                <a href="/register" className="text-primary hover:underline">
                  Зарегистрироваться
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
