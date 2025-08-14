import React, { useEffect, useState } from "react";
import {
  Search,
  FilterDropdown,
  PriceFilter,
  SortBy,
  CategoryButtons,
  ResetFiltersButton,
} from "./";
import { useSearchParams } from "react-router-dom";

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
  /** принимает и отдаёт SLUG (en) */
  onCategorySelect: (slug: string) => void;
  onSearch: (query: string) => void;
  onSortChange: (sort: string) => void;
  onPopularitySelect: (selected: string[]) => void;
  onMaterialSelect: (selected: string[]) => void;
  onCollectionSelect: (selected: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
  resetSignal: number;
  /** стартовый SLUG из URL (если есть) */
  initialCategory?: string;
  initialQuery?: string;
}

const PRICE_MIN = 0;
const PRICE_MAX = 60000;
const DEFAULT_PRICE: [number, number] = [PRICE_MIN, PRICE_MAX];

const ProductFilterPanel: React.FC<ProductFilterPanelProps> = ({
  onCategorySelect,
  onSearch,
  onSortChange,
  onPopularitySelect,
  onMaterialSelect,
  onCollectionSelect,
  onPriceChange,
  resetSignal,
  initialCategory = "", // ← SLUG
  initialQuery = "",
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory); // SLUG
  const [searchValue, setSearchValue] = useState<string>(initialQuery);
  const [sp, setSp] = useSearchParams();
  const [localResetTick, setLocalResetTick] = useState(0);

  useEffect(() => {
    onCategorySelect(initialCategory);
    onSearch(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory, initialQuery]);

  useEffect(() => setActiveCategory(initialCategory), [initialCategory]);
  useEffect(() => setSearchValue(initialQuery), [initialQuery]);

  // внешний сброс -> чистим фильтры и цену
  useEffect(() => {
    onPopularitySelect([]);
    onMaterialSelect([]);
    onCollectionSelect([]);
    onPriceChange(DEFAULT_PRICE);
    setLocalResetTick((x) => x + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal]);

  const handleDropdownToggle = (title: string) =>
    setActiveDropdown((prev) => (prev === title ? null : title));

  // helper: записываем без page=1
  const writeAndReplace = (next: URLSearchParams) => {
    next.delete("page");
    setSp(next, { replace: true });
  };

  /** Клик по категории — приходят SLUG’и */
  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);
    onCategorySelect(slug);
    const next = new URLSearchParams(sp);
    if (slug) next.set("category", slug);
    else next.delete("category");
    writeAndReplace(next);
  };

  const handleResetCategory = () => handleCategoryClick("");

  const handleResetAll = () => {
    setActiveDropdown(null);
    setActiveCategory("");
    setSearchValue("");

    onCategorySelect("");
    onSearch("");
    onSortChange("");
    onPopularitySelect([]);
    onMaterialSelect([]);
    onCollectionSelect([]);
    onPriceChange(DEFAULT_PRICE);

    // /catalog без query
    setSp(new URLSearchParams(), { replace: true });

    setLocalResetTick((x) => x + 1);
    window.scrollTo({ top: 0, behavior: "auto" });
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
              const next = new URLSearchParams(sp);
              if (query) next.set("q", query);
              else next.delete("q");
              writeAndReplace(next);
            }}
          />
        </div>

        <CategoryButtons
          categories={categories} // UI — русские подписи
          activeCategory={activeCategory} // state — SLUG
          onCategoryClick={handleCategoryClick} // отдаём SLUG
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
              onSelect={(arr) => {
                onPopularitySelect(arr);
                const next = new URLSearchParams(sp);
                if (arr.length) next.set("popularity", arr.join(","));
                else next.delete("popularity");
                writeAndReplace(next);
              }}
              resetSignal={localResetTick}
            />

            <PriceFilter
              activeDropdown={activeDropdown}
              onToggle={handleDropdownToggle}
              onPriceChange={([min, max]) => {
                onPriceChange([min, max]);
                const next = new URLSearchParams(sp);
                const isDefault = min === PRICE_MIN && max === PRICE_MAX;
                if (isDefault) {
                  next.delete("priceMin");
                  next.delete("priceMax");
                } else {
                  next.set("priceMin", String(min));
                  next.set("priceMax", String(max));
                }
                writeAndReplace(next);
              }}
              resetSignal={localResetTick}
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
              onSelect={(arr) => {
                onMaterialSelect(arr);
                const next = new URLSearchParams(sp);
                if (arr.length) next.set("materials", arr.join(","));
                else next.delete("materials");
                writeAndReplace(next);
              }}
              resetSignal={localResetTick}
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
              onSelect={(arr) => {
                onCollectionSelect(arr);
                const next = new URLSearchParams(sp);
                if (arr.length) next.set("collections", arr.join(","));
                else next.delete("collections");
                writeAndReplace(next);
              }}
              resetSignal={localResetTick}
            />
          </div>

          <div className="hidden sm:flex items-center gap-4 w-auto">
            <SortBy
              onSortChange={(sort) => {
                onSortChange(sort);
                const next = new URLSearchParams(sp);
                if (sort) next.set("sort", sort);
                else next.delete("sort");
                writeAndReplace(next);
              }}
              resetSignal={localResetTick}
            />
            <ResetFiltersButton onReset={handleResetAll} />
          </div>
        </div>

        <div className="mt-4 sm:hidden w-full flex justify-center">
          <ResetFiltersButton onReset={handleResetAll} />
        </div>
      </div>
    </section>
  );
};

export default ProductFilterPanel;
