import React from "react";

const SortBy: React.FC = () => {
  return (
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
  );
};

export default SortBy;
