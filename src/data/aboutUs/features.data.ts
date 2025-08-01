// src/components/sections/aboutUsPage/features.data.ts

export type FeatureIcon = "crown" | "handshake" | "gem";

export interface FeaturesSectionData {
  /** Заголовок секции */
  title: string;
  /** Подзаголовок/лид секции */
  lead: string;
}

export const FEATURES_SECTION: FeaturesSectionData = {
  title: "Преимущества Orlov Brand",
  lead: "Элитные чехлы для телефонов Orlov — это не просто защита, это статус, премиум и стиль, который подчеркивает ваш уникальный вкус.",
};

export interface FeatureData {
  id: number;
  icon: FeatureIcon;
  title: string[];
  description: string[];
  link: { to: string; text: string };
}

export const FEATURES: FeatureData[] = [
  {
    id: 1,
    icon: "crown",
    title: ["Премиальное", "качество"],
    description: [
      "Отборные материалы, тщательная ручная работа и строгий контроль качества — основа наших изделий.",
      "Мы дарим нашим клиентам к каждому заказу целый ряд преимуществ: элитарная упаковка, престижное наполнение и авторский подарок — решение ORLOV для Вас.",
    ],
    link: { to: "/catalog", text: "Смотреть каталог →" },
  },
  {
    id: 2,
    icon: "handshake",
    title: ["Индивидуальный", "подход"],
    description: [
      "Мы понимаем, что каждый клиент уникален. Именно поэтому мы разрабатываем решения, полностью соответствующие вашим пожеланиям.",
      "Компания ORLOV знает и ценит своих клиентов. Для нас главное — ваше уважение и доверие!",
    ],
    link: { to: "/catalog", text: "Смотреть каталог →" },
  },
  {
    id: 3,
    icon: "gem",
    title: ["Стиль", "и эксклюзив"],
    description: [
      "Каждый аксессуар от ORLOV — это отражение статуса и уверенности.",
      "Мы создаем предметы искусства для наших клиентов, постоянно увеличивая ассортимент товаров.",
      "С нами вы знаете, что доверяете лучшему!",
    ],
    link: { to: "/catalog", text: "Смотреть каталог →" },
  },
];
