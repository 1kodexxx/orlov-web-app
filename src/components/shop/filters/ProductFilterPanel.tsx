import React, { useEffect, useState, useRef } from "react";
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
  initialCategory = "",
  initialQuery = "",
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchValue, setSearchValue] = useState<string>(initialQuery);
  const [sp, setSp] = useSearchParams();
  const [localResetTick, setLocalResetTick] = useState(0);

  // флаг «идёт сброс» — блокирует записи в URL из дочерних обработчиков
  const [isResetting, setIsResetting] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    onCategorySelect(initialCategory);
    onSearch(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory, initialQuery]);

  useEffect(() => setActiveCategory(initialCategory), [initialCategory]);
  useEffect(() => setSearchValue(initialQuery), [initialQuery]);

  // внешний сброс -> чистим доп. фильтры и цену
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

  // не пишем page=1
  const writeAndReplace = (next: URLSearchParams) => {
    next.delete("page");
    setSp(next, { replace: true });
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategorySelect(category);
    const next = new URLSearchParams(sp);
    next.set("category", category);
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
    // 0) включаем «режим сброса»
    setIsResetting(true);

    // 1) Сброс локального UI-состояния
    setActiveCategory("");
    setSearchValue("");
    onCategorySelect("");
    onSearch("");
    onSortChange(""); // сортировка — дефолт (релевантность)
    onPopularitySelect([]);
    onMaterialSelect([]);
    onCollectionSelect([]);
    onPriceChange(DEFAULT_PRICE);

    // 2) Полная очистка адресной строки: /catalog без query
    setSp(new URLSearchParams(), { replace: true });

    // 3) Сообщаем дочерним фильтрам о сбросе (они обновят UI),
    // но их onSelect/onPriceChange не будут писать в URL благодаря isResetting
    setLocalResetTick((x) => x + 1);

    // 4) Выключим «режим сброса» в следующий тик
    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => {
      setIsResetting(false);
    }, 0);

    // 5) Скролл к началу
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    };
  }, []);

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
              onSelect={(arr) => {
                onPopularitySelect(arr);
                if (isResetting) return; // во время сброса ничего не пишем
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
                if (isResetting) return; // во время сброса не трогаем URL
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
                if (isResetting) return;
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
                if (isResetting) return;
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
              resetSignal={localResetTick}
              onSortChange={(sort) => {
                onSortChange(sort);
                if (isResetting) return;
                const next = new URLSearchParams(sp);
                if (sort) next.set("sort", sort);
                else next.delete("sort");
                writeAndReplace(next);
              }}
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
