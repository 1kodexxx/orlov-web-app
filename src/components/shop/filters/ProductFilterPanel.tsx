import React, { useState, useEffect } from "react";
import {
  Search,
  FilterDropdown,
  PriceFilter,
  SortBy,
  CategoryButtons,
} from "./";

const categories = [
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

interface ProductFilterPanelProps {
  onCategorySelect: (category: string) => void;
  onSearch: (query: string) => void;
  onSortChange: (sort: string) => void;
  onPopularitySelect: (selected: string[]) => void;
  onMaterialSelect: (selected: string[]) => void;
  onCollectionSelect: (selected: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
  resetSignal: number;
  initialCategory?: string;
  initialQuery?: string;
}

const ProductFilterPanel: React.FC<ProductFilterPanelProps> = ({
  onCategorySelect,
  onSearch,
  onSortChange,
  onPopularitySelect,
  onMaterialSelect,
  onCollectionSelect,
  onPriceChange,
  resetSignal,
  initialCategory = "",
  initialQuery = "",
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchValue, setSearchValue] = useState<string>(initialQuery);

  useEffect(() => {
    onCategorySelect(initialCategory);
    onSearch(initialQuery);
  }, [initialCategory, initialQuery]);

  useEffect(() => {
    onPopularitySelect([]);
    onMaterialSelect([]);
    onCollectionSelect([]);
    onPriceChange([0, Infinity]);
  }, [resetSignal]);

  const handleDropdownToggle = (title: string) =>
    setActiveDropdown((prev) => (prev === title ? null : title));

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategorySelect(category);
  };

  const handleResetCategory = () => {
    setActiveCategory("");
    onCategorySelect("");
  };

  return (
    <section className="text-text-secondary bg-background body-font m-0">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-2">
          <Search
            value={searchValue}
            onSearch={(query) => {
              setSearchValue(query);
              onSearch(query);
            }}
          />
        </div>

        <CategoryButtons
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          onResetCategory={handleResetCategory}
        />

        <div className="flex flex-wrap items-center gap-0 sm:gap-4 justify-start sm:justify-between">
          <div className="flex flex-wrap items-center gap-4 flex-1">
            <FilterDropdown
              title="Популярность"
              options={[
                { id: "hit", label: "Хит продаж" },
                { id: "new", label: "Новинка" },
                { id: "recommended", label: "Рекомендуем" },
              ]}
              activeDropdown={activeDropdown}
              onToggle={handleDropdownToggle}
              onSelect={onPopularitySelect}
              resetSignal={resetSignal}
            />

            <PriceFilter
              activeDropdown={activeDropdown}
              onToggle={handleDropdownToggle}
              onPriceChange={onPriceChange}
              resetSignal={resetSignal}
            />

            <FilterDropdown
              title="Материал"
              options={[
                { id: "Кожа", label: "Кожа" },
                { id: "Металл", label: "Металл" },
                { id: "Силикон", label: "Силикон" },
              ]}
              activeDropdown={activeDropdown}
              onToggle={handleDropdownToggle}
              onSelect={onMaterialSelect}
              resetSignal={resetSignal}
            />

            <FilterDropdown
              title="Коллекция"
              options={[
                { id: "business", label: "Бизнес" },
                { id: "limited", label: "Лимитированная" },
                { id: "premium", label: "Премиум" },
                { id: "autumn2025", label: "Осень 2025" },
              ]}
              activeDropdown={activeDropdown}
              onToggle={handleDropdownToggle}
              onSelect={onCollectionSelect}
              resetSignal={resetSignal}
            />
          </div>

          <div className="w-auto">
            <SortBy onSortChange={onSortChange} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFilterPanel;
