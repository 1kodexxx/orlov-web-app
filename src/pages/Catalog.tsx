import { useState } from "react";
import ProductFilterPanel from "@/components/products/ProductFilterPanel";
import ProductsList from "@/components/products/ProductsList";
import Breadcrumb from "@/components/common/Breadcrumb";

const allProducts = [
  {
    id: 1,
    name: "Чехол премиум iPhone 15",
    image: "https://i.postimg.cc/MGT0pkLs/gold-case.webp",
    price: "24 000 ₽",
    categories: ["iPhone 15"],
  },
  {
    id: 2,
    name: "Чехол премиум Pro",
    image: "https://i.postimg.cc/MGT0pkLs/gold-case.webp",
    price: "24 000 ₽",
    categories: ["Pro"],
  },
  {
    id: 3,
    name: "Чехол премиум Pro Max",
    image: "https://i.postimg.cc/MGT0pkLs/gold-case.webp",
    price: "24 000 ₽",
    categories: ["Pro Max"],
  },
  {
    id: 4,
    name: "Чехол премиум Plus",
    image: "https://i.postimg.cc/MGT0pkLs/gold-case.webp",
    price: "24 000 ₽",
    categories: ["Plus"],
  },
  {
    id: 5,
    name: "Чехол премиум Мужчинам",
    image: "https://i.postimg.cc/MGT0pkLs/gold-case.webp",
    price: "24 000 ₽",
    categories: ["Мужчинам"],
  },
  {
    id: 6,
    name: "Чехол премиум Женщинам",
    image: "https://i.postimg.cc/MGT0pkLs/gold-case.webp",
    price: "24 000 ₽",
    categories: ["Женщинам"],
  },
  {
    id: 7,
    name: "Чехол премиум Патриотизм",
    image: "https://i.postimg.cc/MGT0pkLs/gold-case.webp",
    price: "24 000 ₽",
    categories: ["Патриотизм"],
  },
  {
    id: 8,
    name: "Чехол премиум Бизнес",
    image: "https://i.postimg.cc/MGT0pkLs/gold-case.webp",
    price: "24 000 ₽",
    categories: ["Бизнес"],
  },
];

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filteredProducts = selectedCategory
    ? allProducts.filter((product) =>
        product.categories.includes(selectedCategory)
      )
    : allProducts;

  return (
    <>
      <Breadcrumb />
      <ProductFilterPanel onCategorySelect={setSelectedCategory} />
      <ProductsList products={filteredProducts} />
    </>
  );
};

export default Catalog;
