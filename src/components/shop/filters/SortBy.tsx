import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const sortOptions = [
  { value: "", label: "Сортировать по" }, // дефолт (релевантность на бэкенде)
  { value: "Title, DESC", label: "Название: от Я до А" },
  { value: "Title, ASC", label: "Название: от А до Я" },
  { value: "Price, DESC", label: "Цена: по убыванию" },
  { value: "Price, ASC", label: "Цена: по возрастанию" },
  { value: "Newest", label: "Сначала новые" },
  { value: "Likes", label: "По лайкам" },
  { value: "Views", label: "По просмотрам" },
  { value: "Rating, DESC", label: "Рейтинг: высокий → низкий" },
  { value: "Rating, ASC", label: "Рейтинг: низкий → высокий" },
];

interface SortByProps {
  onSortChange: (sort: string) => void;
  /** инкрементируется при «Сбросить всё» */
  resetSignal?: number;
}

const SortBy: React.FC<SortByProps> = ({ onSortChange, resetSignal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sp, setSp] = useSearchParams();

  const fromUrl = () =>
    sortOptions.find((o) => o.value === (sp.get("sort") || "")) ??
    sortOptions[0];

  const [selected, setSelected] = useState(fromUrl());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // клик вне — закрыть
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // синхронизация, если адрес изменился извне
  useEffect(() => {
    setSelected(fromUrl());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  // явный глобальный сброс от панели
  useEffect(() => {
    if (resetSignal !== undefined) setSelected(sortOptions[0]);
  }, [resetSignal]);

  const handleSelect = (option: { value: string; label: string }) => {
    setSelected(option);
    setIsOpen(false);

    if (option.value) sp.set("sort", option.value);
    else sp.delete("sort"); // дефолт — убрать параметр
    sp.delete("page"); // и не держать page=1
    setSp(sp, { replace: true });

    onSortChange(option.value);
  };

  return (
    <div className="sort-by relative hidden sm:block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-10 flex items-center justify-between gap-2 rounded-sm border border-secondary bg-background-paper text-sm text-text-secondary px-4 cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={isOpen}>
        {selected.label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`w-4 h-4 transition ${isOpen ? "rotate-180" : ""}`}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute top-full mt-2 w-72 rounded-sm border border-secondary bg-background-paper shadow z-50"
          role="listbox">
          {sortOptions.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => handleSelect(option)}
                className="block w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-secondary/30 cursor-pointer"
                role="option"
                aria-selected={selected.value === option.value}>
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortBy;
