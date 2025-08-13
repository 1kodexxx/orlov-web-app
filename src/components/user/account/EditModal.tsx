import React from "react";
import Divider from "./Divider";
import type { UserProfile } from "./types";

type Props = {
  form: Partial<UserProfile>;
  setForm: React.Dispatch<React.SetStateAction<Partial<UserProfile>>>;
  onClose: () => void;
  onSubmit: (data: Partial<UserProfile>) => Promise<void> | void;
  saving: boolean;
};

const EditModal: React.FC<Props> = ({
  form,
  setForm,
  onClose,
  onSubmit,
  saving,
}) => (
  <div
    className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
    role="dialog"
    aria-modal="true">
    <div className="w-full max-w-2xl rounded-lg border border-gray-700 bg-background.paper shadow-2xl">
      <div className="flex items-center justify-between border-b border-gray-700 p-4">
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

      <div className="p-4 md:p-6">
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            void onSubmit(form);
          }}>
          {/* Пункт выдачи (локально в localStorage) */}
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

          {/* Полное имя (раскладываем на first/last в родителе) */}
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

          {/* E-mail — имеет отдельный эндпоинт, сюда не отправляем */}
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
            <p className="mt-1 text-xs text-gray-400">
              Почта меняется через отдельный раздел.
            </p>
          </div>

          {/* Телефон */}
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

          {/* Страна */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Страна
            </label>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
              placeholder="Россия"
              value={form.country ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, country: e.target.value }))
              }
            />
          </div>

          {/* Город */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Город
            </label>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
              placeholder="Москва"
              value={form.city ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            />
          </div>

          {/* Домашний адрес */}
          <div className="col-span-2">
            <label className="mb-2 block text-sm font-medium text-white">
              Домашний адрес
            </label>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-700 bg-[#1b1b1b] p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
              placeholder="Улица, дом, квартира"
              value={form.homeAddress ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, homeAddress: e.target.value }))
              }
            />
          </div>

          {/* Адрес доставки */}
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

export default EditModal;
