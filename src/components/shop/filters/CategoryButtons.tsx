import React, { useEffect, useRef } from "react";
import { categoryLabelToSlug } from "@/utils/categories";

interface CategoryButtonsProps {
  /** список русских лейблов для UI */
  categories: string[];
  /** активная категория — SLUG (en) */
  activeCategory: string;
  /** клик по категории — передаём SLUG (en) */
  onCategoryClick: (slug: string) => void;
  /** сброс активной категории */
  onResetCategory: () => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  categories,
  activeCategory,
  onCategoryClick,
  onResetCategory,
}) => {
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        buttonsRef.current &&
        !buttonsRef.current.contains(target) &&
        !target.closest(".product-card") &&
        !target.closest(".sort-by")
      ) {
        onResetCategory();
      }
    };

    if (activeCategory) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeCategory, onResetCategory]);

  const getButtonClass = (isActive: boolean) =>
    `px-3 py-1 border rounded-full text-sm transition ${
      isActive
        ? "bg-[#EFE393] text-black border-[#EFE393]"
        : "border-secondary text-text-primary hover:border-primary hover:text-gold"
    }`;

  return (
    <div ref={buttonsRef} className="flex flex-wrap gap-2 mb-2">
      {categories.map((label) => {
        const slug = categoryLabelToSlug[label] || ""; // ru → en
        const isActive = activeCategory === slug;
        return (
          <button
            key={slug || label}
            type="button"
            aria-pressed={isActive}
            onClick={() => onCategoryClick(slug)}
            className={getButtonClass(isActive)}
            title={isActive ? `Сбросить: ${label}` : `Показать: ${label}`}>
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryButtons;
