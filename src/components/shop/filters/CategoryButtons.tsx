import React from "react";

interface CategoryButtonsProps {
  categories: string[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  categories,
  activeCategory,
  onCategoryClick,
}) => {
  const getButtonClass = (category: string) =>
    `px-3 py-1 border rounded-full text-sm transition ${
      activeCategory === category
        ? "bg-[#EFE393] text-black border-[#EFE393]"
        : "border-secondary text-text-primary hover:border-primary hover:text-gold"
    }`;

  return (
    <div className="flex flex-wrap gap-2 mb-2">
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
