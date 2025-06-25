import { useState } from "react";
import { allProducts } from "@/data/products";
import ProductFilterPanel from "@/components/shop/filters/ProductFilterPanel";
import ProductsList from "@/components/shop/ProductsList";
import Breadcrumb from "@/components/common/Breadcrumb";

const parsePrice = (price: number | string) => {
  if (typeof price === "number") return price;
  return parseInt(price.replace(/\s/g, "").replace("₽", ""));
};

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const [resetSignal, setResetSignal] = useState<number>(0);

  const [selectedPopularity, setSelectedPopularity] = useState<string[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setResetSignal((prev) => prev + 1);
    setSelectedPopularity([]);
    setSelectedMaterial([]);
    setSelectedCollection([]);
    setPriceRange([0, Infinity]);
  };

  const filteredProducts = allProducts
    .filter((product) => {
      const matchesCategory = selectedCategory
        ? product.categories.includes(selectedCategory)
        : true;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesPopularity =
        selectedPopularity.length > 0
          ? selectedPopularity.includes(product.popularity)
          : true;

      const matchesMaterial =
        selectedMaterial.length > 0
          ? selectedMaterial.includes(product.material)
          : true;

      const matchesCollection =
        selectedCollection.length > 0
          ? selectedCollection.includes(product.collection)
          : true;

      const price = parsePrice(product.price);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      return (
        matchesCategory &&
        matchesSearch &&
        matchesPopularity &&
        matchesMaterial &&
        matchesCollection &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      if (sortOption === "Title, ASC") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "Title, DESC") {
        return b.name.localeCompare(a.name);
      } else if (sortOption === "Price, ASC") {
        return parsePrice(a.price) - parsePrice(b.price);
      } else if (sortOption === "Price, DESC") {
        return parsePrice(b.price) - parsePrice(a.price);
      }
      return 0;
    });

  return (
    <>
      <Breadcrumb />
      <ProductFilterPanel
        onCategorySelect={handleCategorySelect}
        onSearch={setSearchQuery}
        onSortChange={setSortOption}
        onPopularitySelect={setSelectedPopularity}
        onMaterialSelect={setSelectedMaterial}
        onCollectionSelect={setSelectedCollection}
        onPriceChange={setPriceRange}
        resetSignal={resetSignal}
      />
      <ProductsList products={filteredProducts} />
    </>
  );
};

export default Catalog;
