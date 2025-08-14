import React from "react";
import { useSearchParams } from "react-router-dom";
import { ProductFilterPanel } from "@/components/shop/filters";
import { ProductsList } from "@/components/shop";

/**
 * Глупая «склейка»: панель фильтров пишет состояние в URL,
 * список товаров читает его из URL и запрашивает /catalog.
 * Никакой локальной фильтрации по allProducts здесь нет.
 */
const Catalog: React.FC = () => {
  const [sp] = useSearchParams();

  // Начальные значения для UI панели (берём из URL один в один)
  const initialCategory = sp.get("category") || "";
  const initialQuery = sp.get("q") || "";

  // Внешний сигнал сброса сейчас не нужен — панель сама сбрасывает и чистит URL,
  // но проп обязателен — передаём 0.
  const resetSignal = 0;

  return (
    <>
      <ProductFilterPanel
        // коллбеки реально не нужны (всё в URL), но панель их вызывает — передаём no-op
        onCategorySelect={() => {}}
        onSearch={() => {}}
        onSortChange={() => {}}
        onPopularitySelect={() => {}}
        onMaterialSelect={() => {}}
        onCollectionSelect={() => {}}
        onPriceChange={() => {}}
        resetSignal={resetSignal}
        initialCategory={initialCategory}
        initialQuery={initialQuery}
      />
      <ProductsList />
    </>
  );
};

export default Catalog;
