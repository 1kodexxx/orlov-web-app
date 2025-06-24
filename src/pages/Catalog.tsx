import ProductFilterPanel from "@/components/products/ProductFilterPanel";
import ProductsList from "@/components/products/ProductsList";
import Breadcrumb from "@/components/common/Breadcrumb";

const breadcrumbItems = [
  { label: "Главная", href: "/" },
  { label: "Категория", href: "/category" },
  { label: "Чехол", href: "/product" },
];

const products = [
  {
    id: 1,
    name: "Чехол премиум",
    image: "https://i.postimg.cc/MGT0pkLs/gold-case.webp",
    price: "24 000 ₽",
  },
  {
    id: 2,
    name: "Чехол премиум",
    image: "https://i.postimg.cc/MGT0pkLs/gold-case.webp",
    price: "24 000 ₽",
  },
  {
    id: 3,
    name: "Чехол премиум",
    image: "https://i.postimg.cc/MGT0pkLs/gold-case.webp",
    price: "24 000 ₽",
  },
  {
    id: 4,
    name: "Чехол премиум",
    image: "https://i.postimg.cc/MGT0pkLs/gold-case.webp",
    price: "24 000 ₽",
  },
  {
    id: 5,
    name: "Чехол премиум",
    image: "https://i.postimg.cc/MGT0pkLs/gold-case.webp",
    price: "24 000 ₽",
  },
  {
    id: 6,
    name: "Чехол премиум",
    image: "https://i.postimg.cc/MGT0pkLs/gold-case.webp",
    price: "24 000 ₽",
  },
  {
    id: 7,
    name: "Чехол премиум",
    image: "https://i.postimg.cc/MGT0pkLs/gold-case.webp",
    price: "24 000 ₽",
  },
  {
    id: 8,
    name: "Чехол премиум",
    image: "https://i.postimg.cc/MGT0pkLs/gold-case.webp",
    price: "24 000 ₽",
  },
];

const Catalog = () => {
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <ProductFilterPanel />
      <ProductsList products={products} />
    </>
  );
};

export default Catalog;
