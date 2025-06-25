import React from "react";

interface SortByProps {
  onSortChange: (sort: string) => void;
}

const SortBy: React.FC<SortByProps> = ({ onSortChange }) => {
  return (
    <div className="hidden sm:block">
      <label htmlFor="SortBy" className="sr-only">
        Сортировка
      </label>
      <select
        id="SortBy"
        onChange={(e) => onSortChange(e.target.value)}
        className="h-10 rounded-sm border-secondary text-sm bg-background-paper text-text-secondary">
        <option value="">Сортировать по</option>
        <option value="Title, DESC">Название: от Я до А</option>
        <option value="Title, ASC">Название: от А до Я</option>
        <option value="Price, DESC">Цена: по убыванию</option>
        <option value="Price, ASC">Цена: по возрастанию</option>
      </select>
    </div>
  );
};

export default SortBy;
