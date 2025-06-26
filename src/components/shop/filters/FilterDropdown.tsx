import React, { useEffect, useRef, useState } from "react";

interface FilterDropdownProps {
  title: string;
  options: { id: string; label: string }[];
  activeDropdown: string | null;
  onToggle: (title: string) => void;
  onSelect: (selected: string[]) => void;
  resetSignal: number;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  title,
  options,
  activeDropdown,
  onToggle,
  onSelect,
  resetSignal,
}) => {
  const isOpen = activeDropdown === title;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

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

  useEffect(() => {
    setSelectedOptions([]);
    onSelect([]);
  }, [resetSignal]);

  const handleCheckboxChange = (id: string) => {
    let updatedOptions: string[] = [];

    if (selectedOptions.includes(id)) {
      updatedOptions = selectedOptions.filter((option) => option !== id);
    } else {
      updatedOptions = [...selectedOptions, id];
    }

    setSelectedOptions(updatedOptions);
    onSelect(updatedOptions);
  };

  const handleReset = () => {
    setSelectedOptions([]);
    onSelect([]);
  };

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      {/* Десктоп версия */}
      <div className="hidden sm:block">
        <button
          onClick={() => onToggle(title)}
          className="flex items-center gap-2 border-b border-secondary pb-1 text-text-primary transition hover:border-primary cursor-pointer">
          <span className="text-sm font-medium">{title}</span>
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
          <div className="absolute top-full mt-2 z-50 w-64 rounded-sm border border-secondary bg-background-paper">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-text-secondary">
                {selectedOptions.length} выбрано
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="text-sm text-text-primary underline underline-offset-4">
                Сбросить
              </button>
            </header>
            <ul className="space-y-1 border-t border-secondary p-4">
              {options.map((o) => (
                <li key={o.id}>
                  <label
                    htmlFor={o.id}
                    className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id={o.id}
                      checked={selectedOptions.includes(o.id)}
                      onChange={() => handleCheckboxChange(o.id)}
                      className="w-5 h-5 rounded-sm border-secondary shadow-sm bg-background-paper cursor-pointer"
                    />
                    <span className="text-sm font-medium text-text-secondary">
                      {o.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Мобильная версия */}
      <div className="sm:hidden">
        <button
          onClick={() => onToggle(title)}
          className="w-full flex justify-between items-center border-b pb-1">
          <span>{title}</span>
          <span
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>
        {isOpen && (
          <div className="pt-2 space-y-2">
            {options.map((o) => (
              <label key={o.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(o.id)}
                  onChange={() => handleCheckboxChange(o.id)}
                />
                <span>{o.label}</span>
              </label>
            ))}
            <button
              type="button"
              onClick={handleReset}
              className="text-sm text-text-primary underline underline-offset-4">
              Сбросить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;
