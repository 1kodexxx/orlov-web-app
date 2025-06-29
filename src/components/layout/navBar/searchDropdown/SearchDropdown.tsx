import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface SearchDropdownProps {
  onClose: () => void;
}

const categories = [
  "Все категории",
  "Мужчинам",
  "Женщинам",
  "Патриотам",
  "Гос.служащим",
  "Для бизнеса",
  "Премиум",
  "Культурный код",
  "Имперский стиль",
  "Православие",
  "История",
  "СССР",
];

const SearchDropdown: React.FC<SearchDropdownProps> = ({ onClose }) => {
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSearch = () => {
    const categoryParam = selectedCat === "Все категории" ? "" : selectedCat;
    const searchParam = searchQuery;

    const params = new URLSearchParams();
    if (categoryParam) params.set("category", categoryParam);
    if (searchParam) params.set("query", searchParam);

    navigate(`/catalog?${params.toString()}`);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative flex flex-nowrap items-center w-[400px] max-w-[95vw] bg-background border border-secondary rounded-2xl overflow-visible sm:w-full">
      <div className="relative flex-shrink-0">
        <button
          onClick={() => setIsCatOpen((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-normal bg-background border-r border-secondary text-text-primary hover:bg-secondary/80 transition-colors duration-200 rounded-l-2xl whitespace-nowrap min-w-[120px]">
          {selectedCat}
          <FaChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isCatOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isCatOpen && (
          <ul className="absolute top-full left-0 mt-1 w-48 max-h-60 overflow-y-auto bg-background-paper border border-secondary rounded-xl shadow-lg z-50">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => {
                    setSelectedCat(cat);
                    setIsCatOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-secondary hover:text-text-primary transition-colors duration-200">
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Введите запрос"
        className="flex-grow min-w-0 px-4 py-2 bg-background text-text-primary text-sm placeholder:text-text-secondary outline-none"
      />

      <button
        onClick={handleSearch}
        className="flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary/90 text-primary-contrast rounded-r-2xl transition-colors duration-200">
        <FaSearch className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchDropdown;
