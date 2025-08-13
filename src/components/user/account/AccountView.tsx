import React, { useMemo, useRef, useState } from "react";
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
} from "./types";

type Props = {
  user: UserProfile;
  stats: Stats;
  orders: Order[];
  liked?: ProductSummary[];
  comments?: MyComment[];
  companyReviews?: MyCompanyReview[];
  className?: string;
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
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actMenu, setActMenu] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Загрузка аватара
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // форма редактирования (тип берём из EditModal)
  const [form, setForm] = useState<
    Partial<React.ComponentProps<typeof EditModal>["form"]>
  >({
    firstName: undefined,
    lastName: undefined,
    email: user.email,
    pickupPoint: user.pickupPoint ?? null,
    phone: user.phone ?? null,
    homeAddress: user.homeAddress ?? null,
    deliveryAddress: user.deliveryAddress ?? null,
    birthDate: user.birthDate ?? null,
    country: user.country ?? null,
    city: user.city ?? null,
    headline: undefined,
    organization: undefined,
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
      await onSaveProfile({
        name:
          form.firstName || form.lastName
            ? `${form.firstName ?? ""} ${form.lastName ?? ""}`.trim()
            : user.name,
        email: form.email ?? undefined,
        pickupPoint: form.pickupPoint ?? null,
        phone: form.phone ?? undefined,
        homeAddress: form.homeAddress ?? null,
        deliveryAddress: form.deliveryAddress ?? null,
        birthDate: form.birthDate ?? null,
        country: form.country ?? null,
        city: form.city ?? null,
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
              <svg className={iconCls} viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 4h2l2.5 10H17a2 2 0 1 1 0 4H9a2 2 0 1 1 0-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
              <svg className={iconCls} viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
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
              <svg className={iconCls} viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21s-6.5-4.35-8.5-7.35C1.5 10.5 3 7 6.5 7 8.46 7 10 8.5 12 10.5 14 8.5 15.54 7 17.5 7 21 7 22.5 10.5 20.5 13.65 18.5 16.65 12 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
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
              <svg className={iconCls} viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
              <div className="flex items-center gap-4">
                {/* Аватар или заглушка с инициалами */}
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

                  {/* Кнопка смены аватара */}
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
                      className="inline-flex items-center rounded-lg border border-gray-700 bg-[#1b1b1b] px-3 py-1.5 text-xs font-medium text-gray-200 hover:bg-[#2A2A2A] disabled:opacity-60">
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
              </dl>

              <dl>
                <dt className="font-semibold text-white">Домашний адрес</dt>
                <dd className="flex items-center gap-1 text-text.secondary">
                  <svg
                    className="hidden h-5 w-5 shrink-0 text-text.secondary lg:inline"
                    viewBox="0 0 24 24"
                    fill="none">
                    <path
                      d="M4 12L12 4l8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1V10.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                    viewBox="0 0 24 24"
                    fill="none">
                    <path
                      d="M13 7h6l2 4m-8-4v8M4 7h7a1 1 0 0 1 1 1v9H3V8a1 1 0 0 1 1-1Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
              viewBox="0 0 24 24"
              fill="none">
              <path
                d="M14.3 4.84l2.86 2.86M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5M16.6 4.09a2.02 2.02 0 0 1 2.86 2.86l-6.84 6.84L8 14l.71-3.56 6.84-6.84Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                  status={o.status as OrderStatus}
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
