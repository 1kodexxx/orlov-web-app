import React from "react";

interface PriceFilterProps {
  activeDropdown: string | null;
  onToggle: (title: string) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  activeDropdown,
  onToggle,
}) => {
  const isOpen = activeDropdown === "Цена";

  return (
    <div className="relative">
      <button
        onClick={() => onToggle("Цена")}
        className="flex items-center gap-2 border-b border-secondary pb-1 text-text-primary transition hover:border-primary cursor-pointer">
        <span className="text-sm font-medium">Цена</span>
        <span className={`transition ${isOpen ? "rotate-180" : ""}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 z-50 w-96 rounded-sm border border-secondary bg-background-paper">
          <header className="flex items-center justify-between p-4">
            <span className="text-sm text-text-secondary">
              Максимальная цена: 60 000 ₽
            </span>
            <button
              type="button"
              className="text-sm text-text-primary underline underline-offset-4">
              Сбросить
            </button>
          </header>
          <div className="border-t border-secondary p-4">
            <div className="flex justify-between gap-4">
              <label
                htmlFor="FilterPriceFrom"
                className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">₽</span>
                <input
                  type="number"
                  id="FilterPriceFrom"
                  placeholder="От"
                  className="w-full rounded-md border-secondary shadow-xs sm:text-sm bg-background-paper text-text-secondary"
                />
              </label>
              <label
                htmlFor="FilterPriceTo"
                className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">₽</span>
                <input
                  type="number"
                  id="FilterPriceTo"
                  placeholder="До"
                  className="w-full rounded-md border-secondary shadow-xs sm:text-sm bg-background-paper text-text-secondary"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
