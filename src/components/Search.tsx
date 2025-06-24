import React, { useState } from "react";

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({
  placeholder = "Поиск...",
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <label htmlFor="Search" className="block w-full">
      <span className="text-sm font-medium text-text-primary">Поиск</span>

      <div className="relative mt-2">
        <input
          type="text"
          id="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full h-10 rounded border border-secondary bg-background-paper text-text-secondary shadow-sm sm:text-sm px-4 pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
        />

        <span className="absolute inset-y-0 right-2 flex items-center">
          <button
            type="button"
            aria-label="Найти"
            onClick={handleSearch}
            className="p-1.5 rounded-full text-text-secondary hover:bg-secondary/40 transition">
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
          </button>
        </span>
      </div>
    </label>
  );
};

export default Search;
