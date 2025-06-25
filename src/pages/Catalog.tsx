import { useState } from "react";
import { allProducts } from "@/data/products"; // 🔥 ЗАГРУЗКА из products.ts
import { ProductFilterPanel } from "@/components/shop/filters";
import ProductsList from "@/components/shop/ProductsList";
import Breadcrumb from "@/components/common/Breadcrumb";

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.categories.includes(selectedCategory)
      : true;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Breadcrumb />
      <ProductFilterPanel
        onCategorySelect={setSelectedCategory}
        onSearch={setSearchQuery}
      />
      <ProductsList products={filteredProducts} />{" "}
      {/* 🔥 Обязательно передать */}
    </>
  );
};

export default Catalog;
