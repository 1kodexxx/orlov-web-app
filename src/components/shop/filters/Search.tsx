import React, { useState, useEffect } from "react";

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({
  placeholder = "Поиск...",
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedPlaceholder((prev) => {
        if (index < placeholder.length) {
          return prev + placeholder[index];
        } else {
          return "";
        }
      });

      setIndex((prev) => (prev < placeholder.length ? prev + 1 : 0));
    }, 300); // 🔥 Уменьшил скорость, теперь 300ms между буквами

    return () => clearInterval(interval);
  }, [index, placeholder]);

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
