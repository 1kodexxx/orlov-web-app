import React, { useState, useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  value: string;
  /** внешний сигнал сброса (инкремент) */
  resetSignal?: number;
}

const Search: React.FC<SearchProps> = ({
  placeholder = "Поиск...",
  onSearch,
  value,
  resetSignal = 0,
}) => {
  const [query, setQuery] = useState(value);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const [sp, setSp] = useSearchParams();

  useEffect(() => setQuery(value), [value]);

  // «печатание» плейсхолдера
  useEffect(() => {
    const text = placeholder;
    let index = 0;
    const speed = 200;
    const id = setInterval(() => {
      setAnimatedPlaceholder(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        setTimeout(() => {
          index = 0;
          setAnimatedPlaceholder("");
        }, 1000);
      }
    }, speed);
    return () => clearInterval(id);
  }, [placeholder]);

  // фокус из навбара
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("focus") === "search" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [location]);

  // внешний сброс: чистим поле и q в URL
  useEffect(() => {
    if (!resetSignal) return;
    setQuery("");
    const next = new URLSearchParams(sp);
    next.delete("q");
    next.delete("page");
    setSp(next, { replace: true });
    onSearch("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    onSearch(v);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
    const next = new URLSearchParams(sp);
    next.delete("q");
    next.delete("page");
    setSp(next, { replace: true });
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
          placeholder={animatedPlaceholder}
          className="w-full h-10 rounded border border-secondary bg-background-paper text-text-secondary shadow-sm sm:text-sm px-4 pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
        />
        <span className="absolute inset-y-0 right-2 flex items-center">
          <button
            type="button"
            aria-label={query ? "Очистить" : "Найти"}
            onClick={query ? handleClear : undefined}
            className="p-1.5 rounded-full text-text-secondary hover:bg-secondary/40 transition">
            {query ? (
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
