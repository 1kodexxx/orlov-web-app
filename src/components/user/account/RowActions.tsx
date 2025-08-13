import React from "react";
import type { OrderStatus } from "./types";

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

export default RowActions;
