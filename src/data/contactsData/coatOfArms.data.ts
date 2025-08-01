// src/data/aboutUsData/coatOfArms.data.ts

export interface CoatOfArmsTexts {
  title: string;
  paragraphs: string[];
  noteBold: string;
  noteLight: string;
}

export interface CoatOfArmsCta {
  text: string;
  link: string;
}

export interface CoatOfArmsImages {
  /** Используется для предварительной загрузки (png) */
  preload: string;
  /** Основное изображение (webp) */
  main: string;
}

export interface CoatOfArmsConfig {
  /** Высота хедера в rem, используется для вычисления min-height секции */
  headerHeightRem: number;
}

export interface CoatOfArmsData {
  texts: CoatOfArmsTexts;
  cta: CoatOfArmsCta;
  images: CoatOfArmsImages;
  config: CoatOfArmsConfig;
}

export const COAT_OF_ARMS: CoatOfArmsData = {
  texts: {
    title: "Свяжитесь с нами",
    paragraphs: [
      "Наша команда всегда готова помочь Вам 24/7. Если у Вас есть вопросы о продукции, заказах или сотрудничестве – свяжитесь с нами любым удобным способом! Мы гарантируем оперативность и внимательное отношение к деталям. Ценим доверие клиентов к нашей компании и предлагаем форматы общения для достижения совместного результата.",
    ],
    noteBold: "Наш бренд — это не только стиль, но и забота.",
    noteLight: "Пишите — мы рядом.",
  },
  cta: {
    text: "Связаться с нами",
    link: "https://t.me/ORLOV_brand777",
  },
  images: {
    preload: "https://i.postimg.cc/QNzWgGX0/coat-Of-Arms.png",
    main: "https://i.postimg.cc/fRZnppHN/coat-Of-Arms.webp",
  },
  config: {
    headerHeightRem: 3,
  },
};
