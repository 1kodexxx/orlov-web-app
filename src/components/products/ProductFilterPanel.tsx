import React, { useState } from "react";
import Search from "@/components/products/Search";
import FilterDropdown from "@/components/products/filters/FilterDropdown";
import PriceFilter from "@/components/products/filters/PriceFilter";

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
}

const ProductFilterPanel: React.FC<ProductFilterPanelProps> = ({
  onCategorySelect,
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

  const getButtonClass = (category: string) =>
    `px-3 py-1 border rounded-full text-sm transition ${
      activeCategory === category
        ? "bg-[#EFE393] text-black border-[#EFE393]"
        : "border-secondary text-text-primary hover:border-primary hover:text-gold"
    }`;

  return (
    <section className="text-text-secondary bg-background body-font m-0">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-2">
          <Search />
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={getButtonClass(category)}>
              {category}
            </button>
          ))}
        </div>

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
              title="Наличие"
              options={[
                { id: "inStock", label: "В наличии (5+)" },
                { id: "preOrder", label: "Под заказ (3+)" },
                { id: "outOfStock", label: "Нет в наличии (10+)" },
              ]}
              activeDropdown={activeDropdown}
              onToggle={handleDropdownToggle}
            />

            <PriceFilter
              activeDropdown={activeDropdown}
              onToggle={handleDropdownToggle}
            />

            <FilterDropdown
              title="Цвет"
              options={[
                { id: "colorBlack", label: "Черный" },
                { id: "colorGold", label: "Золотой" },
                { id: "colorGreen", label: "Зеленый" },
              ]}
              activeDropdown={activeDropdown}
              onToggle={handleDropdownToggle}
            />

            <FilterDropdown
              title="Материал"
              options={[
                { id: "matLeather", label: "Кожа" },
                { id: "matMetal", label: "Металл" },
                { id: "matSilicone", label: "Силикон" },
              ]}
              activeDropdown={activeDropdown}
              onToggle={handleDropdownToggle}
            />

            <FilterDropdown
              title="Бренд"
              options={[
                { id: "brandOrlov", label: "Orlov" },
                { id: "brandPremium", label: "Premium Line" },
                { id: "brandClassic", label: "Classic" },
              ]}
              activeDropdown={activeDropdown}
              onToggle={handleDropdownToggle}
            />
          </div>

          <div className="hidden sm:block">
            <label htmlFor="SortBy" className="sr-only">
              Сортировка
            </label>
            <select
              id="SortBy"
              className="h-10 rounded-sm border-secondary text-sm bg-background-paper text-text-secondary">
              <option>Сортировать по</option>
              <option value="Title, DESC">Название: от Я до А</option>
              <option value="Title, ASC">Название: от А до Я</option>
              <option value="Price, DESC">Цена: по убыванию</option>
              <option value="Price, ASC">Цена: по возрастанию</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFilterPanel;
