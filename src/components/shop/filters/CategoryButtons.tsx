import React, { useEffect, useRef } from "react";

interface CategoryButtonsProps {
  categories: string[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
  onResetCategory: () => void; // 🔥 сброс категории
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
      if (
        buttonsRef.current &&
        !buttonsRef.current.contains(event.target as Node)
      ) {
        onResetCategory(); // 🔥 сброс при клике вне
      }
    };

    if (activeCategory) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeCategory, onResetCategory]);

  const getButtonClass = (category: string) =>
    `px-3 py-1 border rounded-full text-sm transition ${
      activeCategory === category
        ? "bg-[#EFE393] text-black border-[#EFE393]"
        : "border-secondary text-text-primary hover:border-primary hover:text-gold"
    }`;

  return (
    <div ref={buttonsRef} className="flex flex-wrap gap-2 mb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryClick(category)}
          className={getButtonClass(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
