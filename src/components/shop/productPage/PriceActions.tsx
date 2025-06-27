import { Button } from "@/components/common";

interface PriceActionsProps {
  price: number;
}

export default function PriceActions({ price }: PriceActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6">
      <span className="text-2xl sm:text-3xl font-medium text-text-primary">
        {price.toLocaleString()} ₽
      </span>
      <div className="ml-0 sm:ml-auto flex gap-3">
        <Button
          to="/cart"
          initialText="Добавить в корзину 🛒"
          hoverText="К оформлению 🎉"
          variant="light"
        />
        <button
          className="w-10 h-10 bg-background-paper rounded-full flex items-center justify-center text-text-secondary hover:text-primary transition"
          aria-label="Добавить в избранное">
          <svg
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            className="w-5 h-5">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
