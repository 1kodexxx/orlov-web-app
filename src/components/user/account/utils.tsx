import React from "react";
import type { OrderStatus } from "./types";

// Форматирование цены
export const currency = (v: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(v);

// Плашки для статусов заказа
export const statusPill: Record<
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
