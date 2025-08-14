import React from "react";

interface ResetFiltersButtonProps {
  onReset: () => void;
  disabled?: boolean;
}

const ResetFiltersButton: React.FC<ResetFiltersButtonProps> = ({
  onReset,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onReset}
      disabled={disabled}
      aria-label="Сбросить все фильтры"
      className="w-full sm:w-auto h-8 sm:h-10 px-4 text-sm rounded-sm border border-secondary text-[#CCCCCC] bg-secondary/30 hover:bg-secondary hover:text-[#CCCCCC] disabled:opacity-50 disabled:cursor-not-allowed transition">
      Сбросить всё
    </button>
  );
};

export default ResetFiltersButton;
