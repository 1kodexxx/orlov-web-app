// src/data/products.ts

export interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  categories: string[];
}

export const allProducts: Product[] = [
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
