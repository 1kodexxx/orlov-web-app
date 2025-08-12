// src/components/layout/navBar/accountDropdown/AccountDropdown.tsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export interface AccountDropdownProps {
  onClose: () => void;
  onSignOut?: () => void;
  className?: string;
}

const itemCls =
  "flex w-full rounded-md px-4 py-2.5 text-sm text-gray-300 hover:bg-[#2A2A2A] hover:text-text-primary transition-colors";

export const AccountDropdown: React.FC<AccountDropdownProps> = ({
  onClose,
  onSignOut,
  className = "",
}) => {
  return (
    <motion.div
      onMouseDown={(e) => e.stopPropagation()}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`bg-[#181818] rounded-lg shadow-lg border border-gray-700 z-50 w-80 max-w-[95vw] sm:max-w-md select-none ${className}`}>
      {/* Шапка как у корзины */}
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
          <h3 className="text-lg font-semibold text-primary">Аккаунт</h3>
        </div>

        {/* Список действий */}
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
            <Link to="/account/settings" onClick={onClose} className={itemCls}>
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
            <Link to="/account/addresses" onClick={onClose} className={itemCls}>
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
              onClick={() => {
                onSignOut?.();
                onClose();
              }}
              className="w-full text-left text-gray-300 hover:text-text-primary hover:bg-[#2A2A2A] rounded-md px-4 py-2.5 text-sm transition-colors">
              Выйти
            </button>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default AccountDropdown;
