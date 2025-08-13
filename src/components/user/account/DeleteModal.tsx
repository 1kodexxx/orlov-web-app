import React from "react";

const DeleteModal: React.FC<{
  id: string;
  onCancel: () => void;
  onConfirm: () => Promise<void> | void;
}> = ({ id, onCancel, onConfirm }) => (
  <div
    className="fixed inset-0 z-50 grid place-items-center bg-black p-4"
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

export default DeleteModal;
