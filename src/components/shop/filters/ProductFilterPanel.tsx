import React, { useState, useEffect } from "react";
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
  // desktop dropdown control
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  // category buttons
  const [activeCategory, setActiveCategory] = useState<string>("");

  // mobile accordion state
  const [openPop, setOpenPop] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [openMat, setOpenMat] = useState(false);
  const [openCol, setOpenCol] = useState(false);

  // mobile selections
  const [mobilePopularity, setMobilePopularity] = useState<string[]>([]);
  const [mobileMaterial, setMobileMaterial] = useState<string[]>([]);
  const [mobileCollection, setMobileCollection] = useState<string[]>([]);
  const [mobileMin, setMobileMin] = useState<number | "">("");
  const [mobileMax, setMobileMax] = useState<number | "">("");

  // reset on desktop/mobile filters when resetSignal changes
  useEffect(() => {
    setMobilePopularity([]);
    setMobileMaterial([]);
    setMobileCollection([]);
    setMobileMin("");
    setMobileMax("");
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

  // helper for mobile checkboxes
  const toggleMobile = (
    id: string,
    arr: string[],
    setArr: React.Dispatch<React.SetStateAction<string[]>>,
    callback: (sel: string[]) => void
  ) => {
    const next = arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
    setArr(next);
    callback(next);
  };

  const onMinChange = (v: string) => {
    const num = v === "" ? "" : Number(v);
    setMobileMin(num);
    onPriceChange([
      num === "" ? 0 : num,
      mobileMax === "" ? Infinity : mobileMax,
    ]);
  };
  const onMaxChange = (v: string) => {
    const num = v === "" ? "" : Number(v);
    setMobileMax(num);
    onPriceChange([
      mobileMin === "" ? 0 : mobileMin,
      num === "" ? Infinity : num,
    ]);
  };

  return (
    <section className="text-text-secondary bg-background body-font m-0">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Поиск */}
        <div className="mb-2">
          <Search onSearch={onSearch} />
        </div>

        {/* Категории */}
        <CategoryButtons
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          onResetCategory={handleResetCategory}
        />

        {/* ===== DESKTOP: ИСХОДНАЯ РАСКЛАДКА ФИЛЬТРОВ ===== */}
        <div className="sm:flex sm:items-center sm:justify-between flex-wrap gap-2">
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
        {/* ===== КОНЕЦ DESKTOP ===== */}

        {/* ===== MOBILE: аккордеоны с чекбоксами ===== */}
        <div className="sm:hidden space-y-4 mt-4">
          {/* Популярность */}
          <div>
            <button
              onClick={() => setOpenPop((v) => !v)}
              className="w-full flex justify-between items-center border-b pb-1">
              <span>Популярность</span>
              <span
                className={`transition-transform ${
                  openPop ? "rotate-180" : ""
                }`}>
                ▼
              </span>
            </button>
            {openPop && (
              <div className="pt-2 space-y-2">
                {[
                  { id: "hit", label: "Хит продаж" },
                  { id: "new", label: "Новинка" },
                  { id: "recommended", label: "Рекомендуем" },
                ].map((o) => (
                  <label key={o.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={mobilePopularity.includes(o.id)}
                      onChange={() =>
                        toggleMobile(
                          o.id,
                          mobilePopularity,
                          setMobilePopularity,
                          onPopularitySelect
                        )
                      }
                    />
                    <span>{o.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          {/* Цена */}
          <div>
            <button
              onClick={() => setOpenPrice((v) => !v)}
              className="w-full flex justify-between items-center border-b pb-1">
              <span>Цена</span>
              <span
                className={`transition-transform ${
                  openPrice ? "rotate-180" : ""
                }`}>
                ▼
              </span>
            </button>
            {openPrice && (
              <div className="pt-2 flex gap-2">
                <input
                  type="number"
                  placeholder="От"
                  value={mobileMin}
                  onChange={(e) => onMinChange(e.target.value)}
                  className="flex-1 rounded border px-2 py-1 bg-background-paper"
                />
                <input
                  type="number"
                  placeholder="До"
                  value={mobileMax}
                  onChange={(e) => onMaxChange(e.target.value)}
                  className="flex-1 rounded border px-2 py-1 bg-background-paper"
                />
              </div>
            )}
          </div>
          {/* Материал */}
          <div>
            <button
              onClick={() => setOpenMat((v) => !v)}
              className="w-full flex justify-between items-center border-b pb-1">
              <span>Материал</span>
              <span
                className={`transition-transform ${
                  openMat ? "rotate-180" : ""
                }`}>
                ▼
              </span>
            </button>
            {openMat && (
              <div className="pt-2 space-y-2">
                {["Кожа", "Металл", "Силикон"].map((id) => (
                  <label key={id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={mobileMaterial.includes(id)}
                      onChange={() =>
                        toggleMobile(
                          id,
                          mobileMaterial,
                          setMobileMaterial,
                          onMaterialSelect
                        )
                      }
                    />
                    <span>{id}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          {/* Коллекция */}
          <div>
            <button
              onClick={() => setOpenCol((v) => !v)}
              className="w-full flex justify-between items-center border-b pb-1">
              <span>Коллекция</span>
              <span
                className={`transition-transform ${
                  openCol ? "rotate-180" : ""
                }`}>
                ▼
              </span>
            </button>
            {openCol && (
              <div className="pt-2 space-y-2">
                {["business", "limited", "premium", "autumn2025"].map((id) => (
                  <label key={id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={mobileCollection.includes(id)}
                      onChange={() =>
                        toggleMobile(
                          id,
                          mobileCollection,
                          setMobileCollection,
                          onCollectionSelect
                        )
                      }
                    />
                    <span>{id}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* ===== END MOBILE ===== */}
      </div>
    </section>
  );
};

export default ProductFilterPanel;
