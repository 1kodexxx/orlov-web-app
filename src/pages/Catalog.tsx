// src/pages/Catalog.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ProductsList } from "@/components/shop";
import { ProductFilterPanel } from "@/components/shop/filters";
import { categoryLabelToSlug, categorySlugToLabel } from "@/utils/categories";

const Catalog = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Читаем slug из URL → мапим его в русскую метку для панели фильтров
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const slug = params.get("category") || "";
    const label = categorySlugToLabel[slug] || "";
    const q = params.get("query") || "";

    setSelectedCategory(label);
    setSearchQuery(q);
  }, [location.search]);

  const [sortOption, setSortOption] = useState<string>("");
  const [resetSignal, setResetSignal] = useState<number>(0);
  const [selectedPopularity, setSelectedPopularity] = useState<string[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);

  // При изменении фильтров — пишем обратно в URL (их прочитает ProductsList и обратится к API)
  useEffect(() => {
    const params = new URLSearchParams();

    const slug = categoryLabelToSlug[selectedCategory] || "";
    if (slug) params.set("category", slug);
    if (searchQuery) params.set("query", searchQuery);

    // Доп. фильтры — как в ProductsList (он ожидает эти имена)
    if (selectedPopularity.length)
      params.set("popularity", selectedPopularity.join(","));
    if (selectedMaterial.length)
      params.set("materials", selectedMaterial.join(","));
    if (selectedCollection.length)
      params.set("collections", selectedCollection.join(","));
    if (Number.isFinite(priceRange[0]))
      params.set("priceMin", String(priceRange[0]));
    if (Number.isFinite(priceRange[1]) && priceRange[1] !== Infinity)
      params.set("priceMax", String(priceRange[1]));
    if (sortOption) params.set("sort", sortOption);

    navigate(`/catalog?${params.toString()}`, { replace: true });
  }, [
    selectedCategory,
    searchQuery,
    sortOption,
    selectedPopularity,
    selectedMaterial,
    selectedCollection,
    priceRange,
    navigate,
  ]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setResetSignal((prev) => prev + 1);
    setSelectedPopularity([]);
    setSelectedMaterial([]);
    setSelectedCollection([]);
    setPriceRange([0, Infinity]);
  };

  return (
    <>
      <ProductFilterPanel
        onCategorySelect={handleCategorySelect}
        onSearch={setSearchQuery}
        onSortChange={setSortOption}
        onPopularitySelect={setSelectedPopularity}
        onMaterialSelect={setSelectedMaterial}
        onCollectionSelect={setSelectedCollection}
        onPriceChange={setPriceRange}
        resetSignal={resetSignal}
        initialCategory={selectedCategory}
        initialQuery={searchQuery}
      />

      {/* ProductsList сам читает параметры из URL и ходит в новый API */}
      <ProductsList itemsPerPage={12} />
    </>
  );
};

export default Catalog;
