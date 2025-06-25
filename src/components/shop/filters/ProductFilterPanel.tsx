import React, { useState } from "react";
import Search from "./Search";
import FilterDropdown from "./FilterDropdown";
import PriceFilter from "./PriceFilter";
import SortBy from "./SortBy";
import CategoryButtons from "./CategoryButtons";

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
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("");

  const handleDropdownToggle = (title: string) => {
    setActiveDropdown((prev) => (prev === title ? null : title));
  };

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
          <Search onSearch={onSearch} />
        </div>

        <CategoryButtons
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          onResetCategory={handleResetCategory}
        />

        <div className="sm:flex sm:items-center sm:justify-between flex-wrap gap-2">
          <div className="block sm:hidden">
            <button className="flex items-center gap-2 border-b border-secondary pb-1 text-text-primary transition hover:border-primary">
              <span className="text-sm font-medium">Фильтры и Сортировка</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 rtl:rotate-180">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>

          <div className="hidden sm:flex sm:gap-4 flex-wrap">
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

          <SortBy onSortChange={onSortChange} />
        </div>
      </div>
    </section>
  );
};

export default ProductFilterPanel;
