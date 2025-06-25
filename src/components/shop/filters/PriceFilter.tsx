import React, { useEffect, useRef, useState } from "react";

interface PriceFilterProps {
  activeDropdown: string | null;
  onToggle: (title: string) => void;
  onPriceChange: (range: [number, number]) => void;
  resetSignal: number;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  activeDropdown,
  onToggle,
  onPriceChange,
  resetSignal,
}) => {
  const isOpen = activeDropdown === "Цена";
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  // Авто-закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  // Сброс при смене сигнала
  useEffect(() => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    onPriceChange([0, Infinity]);
  }, [resetSignal]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinPrice(value);
    onPriceChange([value, maxPrice ?? Infinity]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
    onPriceChange([minPrice ?? 0, value]);
  };

  const handleReset = () => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    onPriceChange([0, Infinity]);
  };

  return (
    <div className="relative" ref={dropdownRef}>
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
              onClick={handleReset}
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
                  value={minPrice ?? ""}
                  onChange={handleMinChange}
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
                  value={maxPrice ?? ""}
                  onChange={handleMaxChange}
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
