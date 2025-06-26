import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface SearchProps {
  placeholderList?: string[];
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({
  placeholderList = ["Поиск...", "Найти товар...", "Введите запрос..."],
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 150;
  const deletingSpeed = 75;
  const pauseTime = 1000;

  const currentPlaceholder = placeholderList[currentPlaceholderIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && index <= currentPlaceholder.length) {
      timer = setTimeout(() => {
        setDisplayedPlaceholder(currentPlaceholder.substring(0, index));
        setIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (isDeleting && index >= 0) {
      timer = setTimeout(() => {
        setDisplayedPlaceholder(currentPlaceholder.substring(0, index));
        setIndex((prev) => prev - 1);
      }, deletingSpeed);
    } else if (index === currentPlaceholder.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (index === 0 && isDeleting) {
      setIsDeleting(false);
      setCurrentPlaceholderIndex((prev) =>
        prev === placeholderList.length - 1 ? 0 : prev + 1
      );
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting, currentPlaceholder, placeholderList]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("focus") === "search" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <label
      htmlFor="Search"
      className="block w-full cursor-pointer product-card">
      <span className="text-sm font-medium text-text-primary">Поиск</span>

      <div className="relative mt-2">
        <input
          type="text"
          id="Search"
          ref={inputRef}
          autoComplete="off"
          value={query}
          onChange={handleChange}
          placeholder={displayedPlaceholder}
          className="w-full h-10 rounded border border-secondary bg-background-paper text-text-secondary shadow-sm sm:text-sm px-4 pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
        />

        <span className="absolute inset-y-0 right-2 flex items-center">
          <button
            type="button"
            aria-label={query ? "Очистить" : "Найти"}
            onClick={query ? handleClear : undefined}
            className="p-1.5 rounded-full text-text-secondary hover:bg-secondary/40 transition">
            {query ? (
              // Крестик
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Иконка поиска
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            )}
          </button>
        </span>
      </div>
    </label>
  );
};

export default Search;
