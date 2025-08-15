// src/components/user/LoginForm.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "@/shared/apiClient";
import { useAuth } from "@/features/auth/useAuth";

type PublicUser = {
  id?: number;
  email: string;
  role: "admin" | "manager" | "customer";
};
type LoginResponse = { accessToken: string; user: PublicUser };

type Props = {
  baseUrl?: string;
  onSuccess?: (data: LoginResponse) => void;
  className?: string;
};

function errMsg(err: unknown) {
  if (err instanceof Error) return err.message;
  try {
    return typeof err === "string" ? err : JSON.stringify(err);
  } catch {
    return "Не удалось войти";
  }
}

const LoginForm: React.FC<Props> = ({
  baseUrl = "",
  onSuccess,
  className = "",
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { refreshProfile, setToken } = useAuth();
  const navigate = useNavigate();

  const apiBase = useMemo(
    () => (baseUrl && baseUrl.length ? baseUrl : ""),
    [baseUrl]
  );
  const canSubmit = email.trim() && password.length > 0 && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      // <— ВАЖНО: передаём remember как query-параметр (бек установит долгоживущую rt-cookie)
      const url = `${apiBase}/auth/login${remember ? "?remember=1" : ""}`;
      const res = await fetch(url, {
        method: "POST",
        credentials: "include", // получим httpOnly rt-куку
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as LoginResponse;

      // access держим в памяти
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        setToken(data.accessToken);
      }

      // помечаем режим для будущего авто-рефреша при старте приложения
      try {
        if (remember) localStorage.setItem("auth.remember", "1");
        else localStorage.removeItem("auth.remember");
      } catch {
        /* ignore quota/SS mode */
      }

      await refreshProfile();
      onSuccess?.(data);
      navigate("/account", { replace: true });
    } catch (e) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className={`bg-background min-h-screen flex items-center justify-center ${className}`}>
      <div className="w-full max-w-md px-4">
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
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 text-xs text-text.secondary hover:text-primary">
                    {showPassword ? "Скрыть" : "Показать"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 text-sm text-text.secondary cursor-pointer">
                  <input
                    id="remember"
                    type="checkbox"
                    className="text-primary h-4 w-4 rounded border-gray-700 bg-[#1b1b1b]  focus:ring-primary cursor-pointer"
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

              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-2 w-full rounded-lg bg-primary text-[#1a1a1a] px-5 py-2.5 text-sm font-semibold transition hover:bg-[#e6d878] disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Вход…" : "Войти"}
              </button>

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
