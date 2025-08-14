import React, { useEffect, useRef } from "react";

interface CategoryButtonsProps {
  categories: string[];
  /** активная русская метка категории (точно такая же, как в product.categories) */
  activeCategory: string;
  /** ставим активную категорию (или снимаем, если повторный клик) */
  onCategoryClick: (category: string) => void;
  /** сброс активной категории при клике вне */
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

      // если клик был вне кнопок, вне карточки товара и вне блока сортировки — сбрасываем
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

  const getButtonClass = (category: string) =>
    `px-3 py-1 border rounded-full text-sm transition ${
      activeCategory === category
        ? "bg-[#EFE393] text-black border-[#EFE393]"
        : "border-secondary text-text-primary hover:border-primary hover:text-gold"
    }`;

  return (
    <div ref={buttonsRef} className="flex flex-wrap gap-2 mb-2">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onCategoryClick(category)}
            className={getButtonClass(category)}
            title={
              isActive ? `Сбросить: ${category}` : `Показать: ${category}`
            }>
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryButtons;
