import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import StatCard from "./StatCard";
import PaymentBadge from "./PaymentBadge";
import RowActions from "./RowActions";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { currency, statusPill } from "./utils";
import type {
  AccountCallbacks,
  Order,
  OrderStatus,
  Stats,
  UserProfile,
  ProductSummary,
  MyComment,
  MyCompanyReview,
  PaymentMethod,
} from "./types";

type Props = {
  user: UserProfile;
  stats: Stats;
  orders: Order[];
  liked?: ProductSummary[];
  comments?: MyComment[];
  companyReviews?: MyCompanyReview[];
  className?: string;
  onChangeEmail?: (email: string) => Promise<void> | void;
  onChangePassword?: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void> | void;
} & AccountCallbacks;

/** Инициалы для заглушки аватара */
function initials(name?: string, email?: string) {
  const n = (name ?? "").trim();
  const parts = n.split(/\s+/).filter(Boolean);
  const a = (parts[0]?.[0] ?? "").toUpperCase();
  const b = (parts[1]?.[0] ?? "").toUpperCase();
  const fallback = (email?.[0] ?? "U").toUpperCase();
  return (a + b || fallback).slice(0, 2);
}

const AccountView: React.FC<Props> = ({
  user,
  stats,
  orders,
  className,
  onOrderDetails,
  onOrderRepeat,
  onOrderCancel,
  onSaveProfile,
  onUploadAvatar,
  onChangeEmail,
}) => {
  const navigate = useNavigate();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actMenu, setActMenu] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Загрузка аватара
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // форма редактирования
  const [form, setForm] = useState<
    Partial<React.ComponentProps<typeof EditModal>["form"]>
  >({
    email: user.email,
    pickupPoint: user.pickupPoint ?? null,
    phone: user.phone ?? null,
    homeAddress: user.homeAddress ?? null,
    deliveryAddress: user.deliveryAddress ?? null,
    birthDate: user.birthDate ?? null,
  });

  const totalOrdersCompare = "";
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
      await onSaveProfile({
        name: user.name,
        email: form.email ?? undefined,
        pickupPoint: form.pickupPoint ?? null,
        phone: form.phone ?? undefined,
        homeAddress: form.homeAddress ?? null,
        deliveryAddress: form.deliveryAddress ?? null,
        birthDate: form.birthDate ?? null,
      });
      setEditOpen(false);
    } finally {
      setSaving(false);
    }
  }

  function pickAvatar() {
    if (!onUploadAvatar) return;
    fileRef.current?.click();
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!onUploadAvatar) return;
    const file = e.target.files?.[0];
    e.currentTarget.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Файл должен быть изображением");
      return;
    }
    const MAX = 5 * 1024 * 1024;
    if (file.size > MAX) {
      alert("Размер файла не должен превышать 5 МБ");
      return;
    }
    try {
      setUploadingAvatar(true);
      await onUploadAvatar(file);
    } finally {
      setUploadingAvatar(false);
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
            compare=""
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
            compare=""
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
            compare=""
          />
        </div>

        {/* Профиль и реквизиты */}
        <div className="py-6 md:py-8">
          <div className="mb-6 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-16">
            {/* Левая колонка */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {user.avatarUrl ? (
                  <img
                    className="h-16 w-16 rounded-lg object-cover border border-gray-700"
                    src={user.avatarUrl}
                    alt="Аватар"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg grid place-items-center bg-[#2A2A2A] text-white text-lg font-semibold border border-gray-700 uppercase">
                    {initials(user.name, user.email)}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-none">
                    {user.name}
                  </h2>

                  {/* Смена аватара */}
                  <div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onFileChange}
                    />
                    <button
                      type="button"
                      disabled={!onUploadAvatar || uploadingAvatar}
                      onClick={pickAvatar}
                      className="cursor-pointer inline-flex items-center rounded-lg border border-gray-700 bg-[#1b1b1b] px-3 py-1.5 text-xs font-medium text-gray-200 hover:bg-[#2A2A2A] disabled:opacity-60">
                      {uploadingAvatar ? (
                        <>
                          <svg
                            className="me-1 h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none">
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              opacity="0.25"
                            />
                            <path
                              d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
                              fill="currentColor"
                              opacity="0.75"
                            />
                          </svg>
                          Загрузка…
                        </>
                      ) : (
                        <>
                          <svg
                            className="me-1 h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none">
                            <path
                              d="M12 7v9m0-9L9 10m3-3 3 3M6 16h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2.5L14 4.5A2 2 0 0 0 12.6 4H9.4A2 2 0 0 0 8 4.5L6.5 6H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Сменить аватар
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <dl>
                <dt className="font-semibold text-white">E-mail</dt>
                <dd className="text-text.secondary">{user.email}</dd>
                {onChangeEmail && (
                  <button
                    className="cursor-pointer mt-2 inline-flex items-center rounded border border-gray-700 bg-[#1b1b1b] px-3 py-1.5 text-xs font-medium text-gray-200 hover:bg-[#2A2A2A]"
                    onClick={() => {
                      const v = window.prompt("Новый e-mail", user.email ?? "");
                      if (!v) return;
                      void onChangeEmail(v.trim());
                    }}>
                    Изменить e-mail
                  </button>
                )}
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

              {/* Кнопка переноса на отдельную страницу смены пароля */}
              <button
                className="cursor-pointer inline-flex items-center rounded border border-gray-700 bg-[#1b1b1b] px-3 py-1.5 text-xs font-medium text-gray-200 hover:bg-[#2A2A2A]"
                onClick={() => navigate("/change-password")}>
                Сменить пароль
              </button>
            </div>

            {/* Правая колонка */}
            <div className="space-y-4">
              <dl>
                <dt className="font-semibold text-white">Телефон</dt>
                <dd className="text-text.secondary">{user.phone || "—"}</dd>
              </dl>

              <dl>
                <dt className="font-semibold text-white">Дата рождения</dt>
                <dd className="text-text.secondary">{user.birthDate || "—"}</dd>
              </dl>

              <dl>
                <dt className="font-semibold text-white">Пункт выдачи</dt>
                <dd className="text-text.secondary">
                  {user.pickupPoint || "—"}
                </dd>
              </dl>

              <dl>
                <dt className="mb-1 font-semibold text-white">
                  Платёжные методы
                </dt>
                <dd className="space-y-3">
                  {user.paymentMethods && user.paymentMethods.length > 0 ? (
                    user.paymentMethods.map((pm: PaymentMethod, i: number) => (
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
            className="cursor-pointer inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-[#1a1a1a] hover:bg-[#e6d878] focus:outline-none focus:ring-4 focus:ring-primary-300 sm:w-auto">
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
            const pill = statusPill[o.status as OrderStatus]; // тип ключа для объекта плашек
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
                      className="cursor-pointer hover:underline">
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

      {editOpen && (
        <EditModal
          form={form}
          setForm={setForm}
          onClose={() => setEditOpen(false)}
          onSubmit={handleSave}
          saving={saving}
        />
      )}

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

export default AccountView;
