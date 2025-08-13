import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "@/features/auth/useAuth";

export interface AccountDropdownProps {
  onClose: () => void;
  /** Хендлер выхода. Если не передан — используется logout() из useAuth */
  onSignOut?: () => void | Promise<void>;
  className?: string;
  /**
   * Явно переданный признак авторизации.
   * Если НЕ указан — компонент берёт состояние из useAuth.
   */
  isAuthenticated?: boolean;
}

const SIGN_IN_ROUTE = "/login";
const SIGN_UP_ROUTE = "/register";

const itemCls =
  "flex w-full rounded-md px-4 py-2.5 text-sm text-gray-300 hover:bg-[#2A2A2A] hover:text-text-primary transition-colors";

/** Мини-тип только с теми полями, которые реально нужны здесь */
type UserLite = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
};

function getDisplayName(u?: UserLite | null): string {
  const fn = u?.firstName ?? "";
  const ln = u?.lastName ?? "";
  const full = `${fn} ${ln}`.trim();
  if (full.length > 0) return full;
  const em = u?.email ?? "";
  if (em) return em.split("@")[0] || em;
  return "Пользователь";
}

function getInitials(name: string, email?: string | null): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = (parts[0]?.[0] ?? "").toUpperCase();
  const b = (parts[1]?.[0] ?? "").toUpperCase();
  const fallback = (email?.[0] ?? "U").toUpperCase();
  return (a + b || fallback).slice(0, 2);
}

export const AccountDropdown: React.FC<AccountDropdownProps> = ({
  onClose,
  onSignOut,
  className = "",
  isAuthenticated,
}) => {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  const authed =
    typeof isAuthenticated === "boolean" ? isAuthenticated : !!user;

  const u: UserLite | undefined = user ?? undefined;
  const displayName = React.useMemo(() => getDisplayName(u), [u]);
  const avatarUrl = u?.avatarUrl ?? "";

  async function handleSignOut() {
    try {
      if (onSignOut) {
        await onSignOut();
      } else {
        await logout();
      }
      onClose();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Ошибка при выходе:", err);
      onClose();
    }
  }

  return (
    <motion.div
      onMouseDown={(e) => e.stopPropagation()}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`bg-[#181818] rounded-lg shadow-lg border border-gray-700 z-50 w-80 max-w-[95vw] sm:max-w-md select-none ${className}`}>
      <div className="p-4 relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-0 right-0 m-4 text-gray-400 hover:text-white transition"
          aria-label="Закрыть">
          <FaTimes />
        </button>

        <div className="flex justify-between items-center mb-4 pr-10">
          <h3 className="text-lg font-semibold text-primary">
            {authed ? "Аккаунт" : "Гость"}
          </h3>
        </div>

        {/* Компактная шапка с аватаром, именем и почтой (без кнопки) */}
        {authed && (
          <div className="mb-4 rounded-lg border border-gray-700 bg-[#121212] p-3">
            <div className="flex items-center gap-3">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Аватар"
                  className="h-10 w-10 rounded-full object-cover border border-gray-700"
                />
              ) : (
                <div className="h-10 w-10 rounded-full grid place-items-center bg-[#2A2A2A] text-sm font-semibold text-gray-200 border border-gray-700">
                  {getInitials(displayName, u?.email ?? undefined)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate text-white font-medium leading-tight">
                  {displayName}
                </div>
                {u?.email && (
                  <div className="truncate text-xs text-primary">{u.email}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {authed ? (
          <ul className="space-y-1">
            <li>
              <Link to="/account" onClick={onClose} className={itemCls}>
                Мой профиль
              </Link>
            </li>
            <li>
              <Link to="/account/orders" onClick={onClose} className={itemCls}>
                Мои заказы
              </Link>
            </li>
            <li>
              <Link
                to="/account/settings"
                onClick={onClose}
                className={itemCls}>
                Настройки
              </Link>
            </li>
            <li>
              <Link
                to="/account/favourites"
                onClick={onClose}
                className={itemCls}>
                Избранное
              </Link>
            </li>
            <li>
              <Link
                to="/account/addresses"
                onClick={onClose}
                className={itemCls}>
                Адреса доставки
              </Link>
            </li>
            <li>
              <Link to="/account/billing" onClick={onClose} className={itemCls}>
                Платёжные данные
              </Link>
            </li>

            <li className="my-1 h-px bg-gray-700" />

            <li>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={loading}
                className="w-full text-left text-gray-300 hover:text-text-primary hover:bg-[#2A2A2A] rounded-md px-4 py-2.5 text-sm transition-colors">
                Выйти
              </button>
            </li>
          </ul>
        ) : (
          <ul className="space-y-1">
            <li>
              <Link to={SIGN_IN_ROUTE} onClick={onClose} className={itemCls}>
                Войти
              </Link>
            </li>
            <li>
              <Link to={SIGN_UP_ROUTE} onClick={onClose} className={itemCls}>
                Зарегистрироваться
              </Link>
            </li>

            <li className="my-1 h-px bg-gray-700" />

            <li>
              <Link
                to="/account/favourites"
                onClick={onClose}
                className={itemCls}>
                Избранное
              </Link>
            </li>
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default AccountDropdown;
