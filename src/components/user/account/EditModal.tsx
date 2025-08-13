// src/pages/account/EditModal.tsx
import React from "react";
import Divider from "./Divider";

/** Расширили профиль всеми полями customer, которые редактируем в UI */
export type UserProfile = {
  // базовые
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null; // обычно отдельный эндпоинт, но оставим в форме
  phone?: string | null;

  // дополнительные
  headline?: string | null;
  organization?: string | null;

  // адреса/местоположение
  city?: string | null;
  country?: string | null;
  homeAddress?: string | null;
  deliveryAddress?: string | null;

  // прочее
  birthDate?: string | null; // формат: YYYY-MM-DD
  pickupPoint?: string | null;
};

type Props = {
  form: Partial<UserProfile>;
  setForm: React.Dispatch<React.SetStateAction<Partial<UserProfile>>>;
  onClose: () => void;
  onSubmit: (data: Partial<UserProfile>) => Promise<void> | void;
  saving: boolean;
};

const field = (
  label: string,
  input: React.ReactNode,
  hint?: string,
  className = ""
) => (
  <div className={className}>
    <label className="mb-2 block text-sm font-medium text-white">{label}</label>
    {input}
    {hint ? <p className="mt-1 text-xs text-gray-400">{hint}</p> : null}
  </div>
);

const EditModal: React.FC<Props> = ({
  form,
  setForm,
  onClose,
  onSubmit,
  saving,
}) => {
  // helpers для унифицированного onChange
  const set =
    <K extends keyof UserProfile>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v = e.target.value;
      setForm((f) => ({ ...f, [key]: v === "" ? null : v }));
    };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true">
      {/* Панель модалки — непрозрачная, с ограничением высоты экрана */}
      <div className="w-full max-w-3xl rounded-xl border border-gray-700 bg-[#121212] shadow-2xl">
        {/* Шапка */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-700 p-4 bg-[#121212] rounded-t-xl">
          <h3 className="text-lg font-semibold text-white">Данные аккаунта</h3>
          <button
            onClick={onClose}
            className="rounded p-1 text-text.secondary hover:bg-[#2a2a2a] hover:text-white"
            aria-label="Закрыть">
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

        {/* Тело с прокруткой при переполнении */}
        <div className="max-h-[90vh] overflow-y-auto p-4 md:p-6">
          <form
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              void onSubmit(form);
            }}>
            {/* Пункт выдачи (pickup_point) */}
            {field(
              "Пункт выдачи",
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                placeholder="Введите наименование пункта выдачи"
                value={form.pickupPoint ?? ""}
                onChange={set("pickupPoint")}
              />,
              undefined,
              "col-span-2"
            )}

            {/* Имя / Фамилия */}
            {field(
              "Имя",
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                placeholder="Александр"
                value={form.firstName ?? ""}
                onChange={set("firstName")}
              />
            )}
            {field(
              "Фамилия",
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                placeholder="Пушкин"
                value={form.lastName ?? ""}
                onChange={set("lastName")}
              />
            )}

            {/* E-mail (часто меняется отдельным эндпоинтом) */}
            {field(
              "E-mail",
              <input
                type="email"
                className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                placeholder="name@example.com"
                value={form.email ?? ""}
                onChange={set("email")}
              />,
              "Если на бэке почта меняется отдельным эндпоинтом — сохраняй её отдельно."
            )}

            {/* Телефон */}
            {field(
              "Телефон",
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                placeholder="+7 900 000-00-00"
                value={form.phone ?? ""}
                onChange={set("phone")}
              />,
              undefined,
              "col-span-2"
            )}

            {/* Подпись профиля / Организация */}
            {field(
              "Подпись профиля",
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                placeholder="Например: Покупаю лучшее"
                value={form.headline ?? ""}
                onChange={set("headline")}
              />
            )}
            {field(
              "Организация",
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                placeholder="ООО «Ромашка»"
                value={form.organization ?? ""}
                onChange={set("organization")}
              />
            )}

            {/* Страна / Город */}
            {field(
              "Страна",
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                placeholder="Россия"
                value={form.country ?? ""}
                onChange={set("country")}
              />
            )}
            {field(
              "Город",
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                placeholder="Мурманск"
                value={form.city ?? ""}
                onChange={set("city")}
              />
            )}

            {/* Домашний адрес */}
            {field(
              "Домашний адрес",
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                placeholder="Улица, дом, квартира"
                value={form.homeAddress ?? ""}
                onChange={set("homeAddress")}
              />,
              undefined,
              "col-span-2"
            )}

            {/* Адрес доставки */}
            {field(
              "Адрес доставки",
              <textarea
                rows={3}
                className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                placeholder="Улица, дом, квартира"
                value={form.deliveryAddress ?? ""}
                onChange={set("deliveryAddress")}
              />,
              undefined,
              "col-span-2"
            )}

            {/* Дата рождения */}
            {field(
              "Дата рождения",
              <input
                type="date"
                className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 focus:border-primary focus:ring-primary"
                value={form.birthDate ?? ""}
                onChange={set("birthDate")}
              />
            )}

            {/* Divider – обёрнут в контейнер; класс исправлен */}
            <div className="col-span-2">
              <Divider />
            </div>

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
                className="rounded-lg border border-gray-700 bg-[#1b1b1b] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2а2а2a]">
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
