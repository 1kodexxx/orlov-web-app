import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  FilterDropdown,
  PriceFilter,
  SortBy,
  CategoryButtons,
  ResetFiltersButton,
} from "./";
import { useSearchParams } from "react-router-dom";
import type { FilterDropdownHandle } from "./FilterDropdown";
import type { PriceFilterHandle } from "./PriceFilter";

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
  resetSignal?: number;
  initialCategory?: string;
  initialQuery?: string;
}

const PRICE_MIN = 0;
const PRICE_MAX = 60000;

const ProductFilterPanel: React.FC<ProductFilterPanelProps> = ({
  onCategorySelect,
  onSearch,
  onSortChange,
  onPopularitySelect,
  onMaterialSelect,
  onCollectionSelect,
  onPriceChange,
  resetSignal = 0,
  initialCategory = "",
  initialQuery = "",
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchValue, setSearchValue] = useState<string>(initialQuery);
  const [sp, setSp] = useSearchParams();
  const [localResetTick, setLocalResetTick] = useState(0);

  // refs для принудительного вызова «Сбросить» внутри дропдаунов
  const popularityRef = useRef<FilterDropdownHandle>(null);
  const materialRef = useRef<FilterDropdownHandle>(null);
  const collectionRef = useRef<FilterDropdownHandle>(null);
  const priceRef = useRef<PriceFilterHandle>(null);

  useEffect(() => {
    onCategorySelect(initialCategory);
    onSearch(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory, initialQuery]);

  useEffect(() => setActiveCategory(initialCategory), [initialCategory]);
  useEffect(() => setSearchValue(initialQuery), [initialQuery]);

  useEffect(() => {
    if (!resetSignal) return;
    setLocalResetTick((x) => x + 1);
  }, [resetSignal]);

  const handleDropdownToggle = (title: string) =>
    setActiveDropdown((prev) => (prev === title ? null : title));

  const writeAndReplace = (next: URLSearchParams) => {
    next.delete("page");
    setSp(next, { replace: true });
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategorySelect(category);
    const next = new URLSearchParams(sp);
    if (category) next.set("category", category);
    else next.delete("category");
    writeAndReplace(next);
  };

  const handleResetCategory = () => {
    setActiveCategory("");
    onCategorySelect("");
    const next = new URLSearchParams(sp);
    next.delete("category");
    writeAndReplace(next);
  };

  const handleResetAll = () => {
    // 1) вызвать «Сбросить» во ВСЕХ дропдаунах (то же, что и внутренняя кнопка)
    popularityRef.current?.reset();
    materialRef.current?.reset();
    collectionRef.current?.reset();
    priceRef.current?.reset();

    // 2) локальные состояния панели
    setActiveCategory("");
    setSearchValue("");
    onCategorySelect("");
    onSearch("");
    onSortChange("");
    onPopularitySelect([]);
    onMaterialSelect([]);
    onCollectionSelect([]);
    onPriceChange([PRICE_MIN, PRICE_MAX]);

    // 3) очистка URL
    setSp(new URLSearchParams(), { replace: true });

    // 4) дать «тик» детям, если кто-то ещё слушает
    setLocalResetTick((x) => x + 1);

    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <section className="text-text-secondary bg-background body-font m-0">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-2">
          <Search
            value={searchValue}
            resetSignal={localResetTick}
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
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          onResetCategory={handleResetCategory}
        />

        <div className="flex flex-wrap items-center gap-0 sm:gap-4 justify-start sm:justify-between">
          <div className="flex flex-wrap items-center gap-4 flex-1">
            <FilterDropdown
              ref={popularityRef}
              title="Популярность"
              paramKey="popularity"
              options={[
                { id: "hit", label: "Хит продаж" },
                { id: "new", label: "Новинка" },
                { id: "recommended", label: "Рекомендуем" },
              ]}
              activeDropdown={activeDropdown}
              onToggle={handleDropdownToggle}
              onSelect={(arr) => onPopularitySelect(arr)}
              resetSignal={localResetTick}
            />

            <PriceFilter
              ref={priceRef}
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
              ref={materialRef}
              title="Материал"
              paramKey="materials"
              options={[
                { id: "Кожа", label: "Кожа" },
                { id: "Металл", label: "Металл" },
                { id: "Силикон", label: "Силикон" },
              ]}
              activeDropdown={activeDropdown}
              onToggle={handleDropdownToggle}
              onSelect={(arr) => onMaterialSelect(arr)}
              resetSignal={localResetTick}
            />

            <FilterDropdown
              ref={collectionRef}
              title="Коллекция"
              paramKey="collections"
              options={[
                { id: "business", label: "Бизнес" },
                { id: "limited", label: "Лимитированная" },
                { id: "premium", label: "Премиум" },
                { id: "autumn2025", label: "Осень 2025" },
              ]}
              activeDropdown={activeDropdown}
              onToggle={handleDropdownToggle}
              onSelect={(arr) => onCollectionSelect(arr)}
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
