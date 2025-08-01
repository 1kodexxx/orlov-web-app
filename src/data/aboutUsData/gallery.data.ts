// src/data/aboutUsData/gallery.data.ts

export interface HoverItem {
  title: string;
  text: string;
}

export interface GallerySectionData {
  title: string;
  description: string;
}

/** Мета-данные секции галереи */
export const GALLERY_SECTION: GallerySectionData = {
  title: "Галерея стиля и безупречного качества",
  description:
    "Оцените гармонию формы, цвета и деталей. Здесь вы найдете вдохновение, которое отражает премиальность и индивидуальность каждого изделия.",
};

/** Подписи/тексты для карточек слева (десктоп) */
export const HOVER_ITEMS_LEFT: HoverItem[] = [
  {
    title: "Наследие мастерства",
    text: "Каждый чехол создается вручную по древним традициям российского дворянского ремесла, передаваемым из поколения в поколение.",
  },
  {
    title: "Государственный стиль",
    text: "Изысканные мотивы и строгие линии воплощают величие исторической эстетики и подчеркивают ваш высокий статус.",
  },
  {
    title: "Премиальное качество",
    text: "Используем только лучшие материалы и современные технологии для безупречной защиты и долговечности.",
  },
];

/** Подписи/тексты для карточек справа (десктоп) */
export const HOVER_ITEMS_RIGHT: HoverItem[] = [
  {
    title: "Изысканная элегантность",
    text: "Утонченный дизайн в духе имперских портретов придает вашему устройству статусный вид.",
  },
  {
    title: "Стойкость и надёжность",
    text: "Прочные материалы и продуманная конструкция сохранят идеальный внешний вид на долгие годы.",
  },
  {
    title: "Эксклюзивный характер",
    text: "Ограниченные серии, посвящённые российскому культурному наследию, подчеркнут вашу уникальность.",
  },
];

/** Изображения галереи по умолчанию */
export const GALLERY_IMAGES: string[] = [
  "https://i.postimg.cc/hGS2rKyt/case2.webp",
  "https://i.postimg.cc/hGS2rKyt/case2.webp",
  "https://i.postimg.cc/tRfmjQTB/case1.webp",
  "https://i.postimg.cc/tRfmjQTB/case1.webp",
  "https://i.postimg.cc/hGS2rKyt/case2.webp",
  "https://i.postimg.cc/hGS2rKyt/case2.webp",
];
