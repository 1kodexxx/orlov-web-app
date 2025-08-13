// src/components/user/Account.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/features/auth/useAuth";
import { useNavigate } from "react-router-dom";

/* ======================= типы ======================= */
type OrderStatus = "in_transit" | "cancelled" | "completed";

type Order = {
  id: string;
  date: string; // ISO или dd.mm.yyyy
  price: number; // в валюте магазина
  status: OrderStatus;
};

type PaymentMethod = {
  brand: "visa" | "mc" | "amex" | "mir" | string;
  last4: string;
  expiry: string; // MM/YYYY
};

type Company = {
  name: string;
  info?: string;
};

type UserProfile = {
  avatarUrl?: string;
  name: string;
  email: string;
  homeAddress?: string;
  deliveryAddress?: string;
  phone?: string;
  pickupPoint?: string;
  favouritePickupPoint?: string;
  companies?: Company[];
  paymentMethods?: PaymentMethod[];
  tierBadge?: string; // например: "PRO"
};

type Stats = {
  ordersMade: number;
  ordersChangePct?: number; // +/- в %
  reviewsAdded: number;
  reviewsChangePct?: number;
  favoritesAdded: number;
  favoritesChangePct?: number;
  returns: number;
  returnsChangePct?: number;
};

type Props = {
  user: UserProfile;
  stats: Stats;
  orders: Order[];
  className?: string;

  // Колбэки (необязательно)
  onOrderDetails?: (orderId: string) => void;
  onOrderRepeat?: (orderId: string) => void;
  onOrderCancel?: (orderId: string) => Promise<void> | void;
  onSaveProfile?: (profile: Partial<UserProfile>) => Promise<void> | void;
};

/* ======================= утилиты ======================= */
const currency = (v: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(v);

const statusPill: Record<
  OrderStatus,
  { label: string; cls: string; icon: React.ReactNode }
> = {
  in_transit: {
    label: "В пути",
    cls: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    icon: (
      <svg
        className="me-1 h-3 w-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
        />
      </svg>
    ),
  },
  cancelled: {
    label: "Отменён",
    cls: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    icon: (
      <svg
        className="me-1 h-3 w-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18 17.94 6M18 18 6.06 6"
        />
      </svg>
    ),
  },
  completed: {
    label: "Завершён",
    cls: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    icon: (
      <svg
        className="me-1 h-3 w-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 11.917 9.724 16.5 19 7.5"
        />
      </svg>
    ),
  },
};

/* ======================= UI-атомы ======================= */
const Breadcrumbs: React.FC<{ className?: string }> = ({ className }) => (
  <nav className={`mb-4 flex ${className ?? ""}`} aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li className="inline-flex items-center">
        <a
          href="/"
          className="inline-flex items-center text-sm font-medium text-text.secondary hover:text-primary">
          <svg
            className="me-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
            />
          </svg>
          Главная
        </a>
      </li>
      <li>
        <div className="flex items-center">
          <svg
            className="mx-1 h-4 w-4 text-gray-500 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
          <a
            href="/account"
            className="ms-1 text-sm font-medium text-text.secondary hover:text-primary md:ms-2">
            Личный кабинет
          </a>
        </div>
      </li>
      <li aria-current="page">
        <div className="flex items-center">
          <svg
            className="mx-1 h-4 w-4 text-gray-500 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
          <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">
            Аккаунт
          </span>
        </div>
      </li>
    </ol>
  </nav>
);

const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: number;
  delta?: number;
  compare?: string;
}> = ({ icon, title, value, delta, compare }) => {
  const up = (delta ?? 0) >= 0;
  return (
    <div>
      <div className="mb-2 h-8 w-8 text-gray-400">{icon}</div>
      <h3 className="mb-2 text-text.secondary">{title}</h3>
      <span className="flex items-center text-2xl font-bold text-white">
        {value}
        {typeof delta === "number" && (
          <span
            className={`ms-2 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${
              up
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            }`}>
            <svg
              className="-ms-1 me-1 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              {up ? (
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v13m0-13 4 4m-4-4-4 4"
                />
              ) : (
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 20V7m0 13-4-4m4 4 4-4"
                />
              )}
            </svg>
            {Math.abs(delta)}%
          </span>
        )}
      </span>
      {compare && (
        <p className="mt-2 flex items-center text-sm text-text.secondary">
          <svg
            className="me-1.5 h-4 w-4 text-text.secondary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          {compare}
        </p>
      )}
    </div>
  );
};

const PaymentBadge: React.FC<{ method: PaymentMethod }> = ({ method }) => (
  <div className="flex items-center space-x-4 text-text.secondary">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#2a2a2a]">
      <span className="text-xs uppercase">{method.brand}</span>
    </div>
    <div className="text-sm">
      <p className="mb-0.5 font-medium text-white">
        {method.brand.toUpperCase()} •••• {method.last4}
      </p>
      <p className="text-text.secondary">Срок {method.expiry}</p>
    </div>
  </div>
);

const Divider: React.FC = () => <div className="my-4 h-px bg-gray-700" />;

/* ======================= презентационный компонент ======================= */
export const AccountView: React.FC<Props> = ({
  user,
  stats,
  orders,
  className,
  onOrderDetails,
  onOrderRepeat,
  onOrderCancel,
  onSaveProfile,
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actMenu, setActMenu] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<Partial<UserProfile>>({
    name: user.name,
    email: user.email,
    pickupPoint: user.pickupPoint ?? user.favouritePickupPoint,
    phone: user.phone,
    homeAddress: user.homeAddress,
    deliveryAddress: user.deliveryAddress,
  });

  const totalOrdersCompare = "против 20 за последние 3 месяца";
  const iconCls = "mb-2 h-8 w-8 text-gray-400";

  const ordersSorted = useMemo(
    () =>
      [...orders].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [orders]
  );

  async function handleSave() {
    if (!onSaveProfile) {
      setEditOpen(false);
      return;
    }
    try {
      setSaving(true);
      await onSaveProfile(form);
      setEditOpen(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className={`bg-background py-8 md:py-8 ${className ?? ""}`}>
      <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
        <Breadcrumbs />

        <h2 className="mb-4 text-xl font-semibold text-white sm:text-2xl md:mb-6">
          Общий обзор
        </h2>

        <div className="grid grid-cols-2 gap-6 border-y border-gray-700 py-4 md:py-8 lg:grid-cols-4 xl:gap-16">
          <StatCard
            icon={
              <svg
                className={iconCls}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
            }
            title="Оформлено заказов"
            value={stats.ordersMade}
            delta={stats.ordersChangePct}
            compare={totalOrdersCompare}
          />

          <StatCard
            icon={
              <svg
                className={iconCls}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
                />
              </svg>
            }
            title="Добавлено отзывов"
            value={stats.reviewsAdded}
            delta={stats.reviewsChangePct}
            compare="против 14 за последние 3 месяца"
          />

          <StatCard
            icon={
              <svg
                className={iconCls}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
            }
            title="Товаров в избранное"
            value={stats.favoritesAdded}
            delta={stats.favoritesChangePct}
            compare="против 10 за последние 3 месяца"
          />

          <StatCard
            icon={
              <svg
                className={iconCls}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"
                />
              </svg>
            }
            title="Возвратов товаров"
            value={stats.returns}
            delta={stats.returnsChangePct}
            compare="против 1 за последние 3 месяца"
          />
        </div>

        {/* Профиль и реквизиты */}
        <div className="py-6 md:py-8">
          <div className="mb-6 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-16">
            {/* Левая колонка */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <img
                  className="h-16 w-16 rounded-lg object-cover"
                  src={
                    user.avatarUrl ||
                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                  }
                  alt="Аватар"
                />
                <div>
                  {user.tierBadge && (
                    <span className="mb-2 inline-block rounded bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:text-primary">
                      {user.tierBadge}
                    </span>
                  )}
                  <h2 className="flex items-center text-xl font-bold leading-none text-white sm:text-2xl">
                    {user.name}
                  </h2>
                </div>
              </div>

              <dl>
                <dt className="font-semibold text-white">E-mail</dt>
                <dd className="text-text.secondary">{user.email}</dd>
              </dl>

              <dl>
                <dt className="font-semibold text-white">Домашний адрес</dt>
                <dd className="flex items-center gap-1 text-text.secondary">
                  <svg
                    className="hidden h-5 w-5 shrink-0 text-text.secondary lg:inline"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                    />
                  </svg>
                  {user.homeAddress || "—"}
                </dd>
              </dl>

              <dl>
                <dt className="font-semibold text-white">Адрес доставки</dt>
                <dd className="flex items-center gap-1 text-text.secondary">
                  <svg
                    className="hidden h-5 w-5 shrink-0 text-text.secondary lg:inline"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5"
                    />
                  </svg>
                  {user.deliveryAddress || "—"}
                </dd>
              </dl>
            </div>

            {/* Правая колонка */}
            <div className="space-y-4">
              <dl>
                <dt className="font-semibold text-white">Телефон</dt>
                <dd className="text-text.secondary">{user.phone || "—"}</dd>
              </dl>

              <dl>
                <dt className="font-semibold text-white">
                  Избранный пункт выдачи
                </dt>
                <dd className="text-text.secondary">
                  {user.favouritePickupPoint || user.pickupPoint || "—"}
                </dd>
              </dl>

              <dl>
                <dt className="font-semibold text-white">Мои компании</dt>
                <dd className="text-text.secondary">
                  {user.companies && user.companies.length > 0
                    ? user.companies.map((c, i) => (
                        <div key={i}>
                          {c.name}
                          {c.info ? `, ${c.info}` : ""}
                        </div>
                      ))
                    : "—"}
                </dd>
              </dl>

              <dl>
                <dt className="mb-1 font-semibold text-white">
                  Платёжные методы
                </dt>
                <dd className="space-y-3">
                  {user.paymentMethods && user.paymentMethods.length > 0 ? (
                    user.paymentMethods.map((pm, i) => (
                      <PaymentBadge key={i} method={pm} />
                    ))
                  ) : (
                    <span className="text-text.secondary">Не добавлены</span>
                  )}
                </dd>
              </dl>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-[#1a1a1a] hover:bg-[#e6d878] focus:outline-none focus:ring-4 focus:ring-primary-300 sm:w-auto">
            <svg
              className="-ms-0.5 me-1.5 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
              />
            </svg>
            Редактировать данные
          </button>
        </div>

        {/* Последние заказы */}
        <div className="rounded-lg border border-gray-700 bg-background.paper p-4 md:p-8">
          <h3 className="mb-4 text-xl font-semibold text-white">
            Последние заказы
          </h3>

          {ordersSorted.map((o, idx) => {
            const pill = statusPill[o.status];
            return (
              <div
                key={o.id}
                className={`flex flex-wrap items-center gap-y-4 ${
                  idx < ordersSorted.length - 1
                    ? "border-b border-gray-700 py-4 md:py-5"
                    : "pt-4 md:pt-5"
                }`}>
                <dl className="w-1/2 sm:w-48">
                  <dt className="text-base font-medium text-text.secondary">
                    № заказа:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-white">
                    <button
                      onClick={() => onOrderDetails?.(o.id)}
                      className="hover:underline">
                      #{o.id}
                    </button>
                  </dd>
                </dl>

                <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
                  <dt className="text-base font-medium text-text.secondary">
                    Дата:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-white">
                    {o.date}
                  </dd>
                </dl>

                <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
                  <dt className="text-base font-medium text-text.secondary">
                    Сумма:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-white">
                    {currency(o.price)}
                  </dd>
                </dl>

                <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
                  <dt className="text-base font-medium text-text.secondary">
                    Статус:
                  </dt>
                  <dd
                    className={`mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${pill.cls}`}>
                    {pill.icon}
                    {pill.label}
                  </dd>
                </dl>

                <RowActions
                  id={o.id}
                  status={o.status}
                  actMenu={actMenu}
                  setActMenu={setActMenu}
                  setDeleteId={setDeleteId}
                  onOrderDetails={onOrderDetails}
                  onOrderRepeat={onOrderRepeat}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Модалка редактирования профиля */}
      {editOpen && (
        <EditModal
          form={form}
          setForm={setForm}
          onClose={() => setEditOpen(false)}
          onSubmit={handleSave}
          saving={saving}
        />
      )}

      {/* Модалка удаления заказа */}
      {deleteId && (
        <DeleteModal
          id={deleteId}
          onCancel={() => setDeleteId(null)}
          onConfirm={async () => {
            try {
              await onOrderCancel?.(deleteId);
            } finally {
              setDeleteId(null);
            }
          }}
        />
      )}
    </section>
  );
};

/* ============ служебные подкомпоненты строки заказов и модалок ============ */
const RowActions: React.FC<{
  id: string;
  status: OrderStatus;
  actMenu: string | null;
  setActMenu: React.Dispatch<React.SetStateAction<string | null>>;
  setDeleteId: React.Dispatch<React.SetStateAction<string | null>>;
  onOrderRepeat?: (orderId: string) => void;
  onOrderDetails?: (orderId: string) => void;
}> = ({
  id,
  status,
  actMenu,
  setActMenu,
  setDeleteId,
  onOrderDetails,
  onOrderRepeat,
}) => (
  <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4 relative">
    <button
      type="button"
      onClick={() => setActMenu((p) => (p === id ? null : id))}
      className="flex w-full items-center justify-center rounded-lg border border-gray-700 bg-background.paper px-3 py-2 text-sm font-medium text-white hover:bg-[#2a2a2a] md:w-auto">
      Действия
      <svg
        className="-me-0.5 ms-1.5 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 9-7 7-7-7"
        />
      </svg>
    </button>

    {actMenu === id && (
      <div className="absolute right-0 top-11 z-10 w-44 divide-y divide-gray-700 rounded-lg border border-gray-700 bg-background.paper shadow-xl">
        <ul className="p-2 text-left text-sm font-medium text-text.secondary">
          <li>
            <button
              onClick={() => {
                setActMenu(null);
                onOrderRepeat?.(id);
              }}
              className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-text.secondary hover:bg-[#2a2a2a] hover:text-white">
              <svg
                className="me-1.5 h-4 w-4 text-text.secondary group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
                />
              </svg>
              Повторить заказ
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActMenu(null);
                onOrderDetails?.(id);
              }}
              className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-text.secondary hover:bg-[#2a2a2a] hover:text-white">
              <svg
                className="me-1.5 h-4 w-4 text-text.secondary group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              Детали заказа
            </button>
          </li>
          {status !== "cancelled" && (
            <li>
              <button
                onClick={() => {
                  setActMenu(null);
                  setDeleteId(id);
                }}
                className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-red-400 hover:bg-[#2a2a2a] hover:text-white">
                <svg
                  className="me-1.5 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
                Отменить заказ
              </button>
            </li>
          )}
        </ul>
      </div>
    )}
  </div>
);

const EditModal: React.FC<{
  form: Partial<UserProfile>;
  setForm: React.Dispatch<React.SetStateAction<Partial<UserProfile>>>;
  onClose: () => void;
  onSubmit: () => Promise<void> | void;
  saving: boolean;
}> = ({ form, setForm, onClose, onSubmit, saving }) => (
  <div
    className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
    role="dialog"
    aria-modal="true">
    <div className="w-full max-w-lg rounded-lg border border-gray-700 bg-background.paper shadow-2xl">
      <div className="flex items-center justify-between border-b border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-white">Данные аккаунта</h3>
        <button
          onClick={onClose}
          className="rounded p-1 text-text.secondary hover:bg-[#2a2a2a] hover:text-white">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>

      <div className="p-4 md:p-5">
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            void onSubmit();
          }}>
          <div className="col-span-2">
            <label className="mb-2 block text-sm font-medium text-white">
              Пункт выдачи
            </label>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
              placeholder="Введите наименование пункта выдачи"
              value={form.pickupPoint ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, pickupPoint: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Полное имя
            </label>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
              placeholder="Иван Иванов"
              value={form.name ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              E-mail
            </label>
            <input
              type="email"
              className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
              placeholder="name@example.com"
              value={form.email ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
          </div>

          <div className="col-span-2">
            <label className="mb-2 block text-sm font-medium text-white">
              Телефон
            </label>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
              placeholder="+7 900 000-00-00"
              value={form.phone ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Страна
            </label>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
              placeholder="Россия"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Город
            </label>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
              placeholder="Москва"
            />
          </div>

          <div className="col-span-2">
            <label className="mb-2 block text-sm font-medium text-white">
              Адрес доставки
            </label>
            <textarea
              rows={3}
              className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
              placeholder="Улица, дом, квартира"
              value={form.deliveryAddress ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, deliveryAddress: e.target.value }))
              }
            />
          </div>

          <Divider />

          <div className="col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-[#1a1a1a] hover:bg-[#e6d878] disabled:opacity-60">
              {saving ? "Сохранение…" : "Сохранить"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-700 bg-background.paper px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2a2a2a]">
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

const DeleteModal: React.FC<{
  id: string;
  onCancel: () => void;
  onConfirm: () => Promise<void> | void;
}> = ({ id, onCancel, onConfirm }) => (
  <div
    className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
    role="dialog"
    aria-modal="true">
    <div className="w-full max-w-md rounded-lg bg-background.paper p-5 text-center shadow-2xl border border-gray-700">
      <button
        type="button"
        onClick={onCancel}
        className="absolute right-5 top-5 rounded-lg p-1 text-text.secondary hover:bg-[#2a2a2a] hover:text-white">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#2a2a2a] p-2">
        <svg
          className="h-8 w-8 text-text.secondary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
          />
        </svg>
      </div>
      <p className="mb-3.5 text-white">
        Вы уверены, что хотите удалить заказ{" "}
        <span className="text-primary font-medium">#{id}</span> из аккаунта?
      </p>
      <p className="mb-4 text-text.secondary">Это действие необратимо.</p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onCancel}
          className="rounded-lg border border-gray-700 bg-background.paper px-3 py-2 text-sm font-medium text-white hover:bg-[#2a2a2a]">
          Нет, отменить
        </button>
        <button
          onClick={onConfirm}
          className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700">
          Да, удалить
        </button>
      </div>
    </div>
  </div>
);

/* ======================= страница ======================= */
const AccountPage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // 👇 Исправлено: без any. Либо добавьте типы Vite в tsconfig ("vite/client"),
  // и тогда хватит `import.meta.env.VITE_API_URL`.
  type ViteEnv = { VITE_API_URL?: string };
  const baseUrl = ((import.meta as unknown as { env: ViteEnv }).env
    .VITE_API_URL ?? "") as string;

  // Моки на случай отсутствия API — удалите, когда подключите бекенд
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    // Попробуем запросить сводку/заказы; если не получится — используем моки
    (async () => {
      try {
        const [oRes, sRes] = await Promise.all([
          fetch(`${baseUrl}/account/orders`, { credentials: "include" }),
          fetch(`${baseUrl}/account/stats`, { credentials: "include" }),
        ]);
        if (oRes.ok) {
          const o = (await oRes.json()) as Order[];
          setOrders(o);
        }
        if (sRes.ok) {
          const s = (await sRes.json()) as Stats;
          setStats(s);
        }
      } catch {
        // игнорируем; ниже поставим моки
      } finally {
        // если ничего не пришло — моки
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
          (prev) =>
            prev ?? {
              ordersMade: 24,
              ordersChangePct: 10.3,
              reviewsAdded: 16,
              reviewsChangePct: 8.6,
              favoritesAdded: 8,
              favoritesChangePct: -12,
              returns: 2,
              returnsChangePct: 50,
            }
        );
      }
    })();
  }, [baseUrl]);

  if (loading || !user || !stats) {
    return (
      <section className="min-h-[60vh] grid place-items-center">
        <div className="text-text.secondary">Загрузка…</div>
      </section>
    );
  }

  const profile: UserProfile = {
    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.email,
    email: user.email,
    avatarUrl: user.avatarUrl ?? undefined,
  };

  return (
    <AccountView
      user={profile}
      stats={stats}
      orders={orders}
      onOrderDetails={(id) => console.log("details", id)}
      onOrderRepeat={(id) => console.log("repeat", id)}
      onOrderCancel={(id) => console.log("cancel", id)}
      onSaveProfile={(data) => console.log("save profile", data)}
    />
  );
};

export default AccountPage;
